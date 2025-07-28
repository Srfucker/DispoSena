const bcrypt = require('bcrypt');
const modelo = require('../../modelo/aprendiz/LoginApMovilModelo');

class LoginApMovilControlador {
    static async validarCredencial(req, res) {
        const { t2: documento, t6: llave } = req.body; // Renombré 'llave' a 'contrasenaIngresada' para claridad

        if (!documento || !llave) {
            return res.status(400).json({ error: 'Documento y contraseña son obligatorios.' });
        }

        try {
            // 1. Buscar el usuario por documento para obtener todos sus datos (incluido estado e intentos)
            const user = await modelo.buscarUsuarioPorDocumento(documento);

            // 2. Si el usuario no existe
            if (!user) {
                // No incrementamos intentos para usuarios inexistentes para evitar enumeración.
                // Podrías registrar un log de intentos fallidos en el sistema.
                return res.status(401).json({ error: 'Credenciales inválidas.' });
            }

            // 3. Verificar si el usuario está bloqueado por intentos fallidos
            if (user.estado === 'Bloqueado') {
                return res.status(403).json({ error: 'Su cuenta está bloqueada debido a múltiples intentos fallidos. Consulte con el administrador.' });
            }

            // 4. Verificar si ya tiene una sesión activa (si es el comportamiento deseado)
            // Esto se hace DESPUÉS de validar si el usuario existe y no está bloqueado.
            // Si permites múltiples sesiones, puedes omitir este bloque.
            const sesionActiva = await modelo.buscarTokenSesionActiva(documento, "Movil");
            if (sesionActiva) {
                return res.status(401).json({ error: 'Ya existe una sesión activa para este usuario en un dispositivo movil. Cierre la sesión existente.' });
            }

            // 5. Comparar la contraseña ingresada con el hash almacenado en la DB
            // Asegúrate que 'user.contrasena' contenga el hash de la contraseña de la DB.
            const contrasenaCoincide = await bcrypt.compare(llave, user.llave);

            if (!contrasenaCoincide) {
                // 6. Si la contraseña no coincide, incrementar intentos fallidos
                const nuevosIntentos = await modelo.incrementarIntentoFallido(documento);
                let mensajeError = 'Credenciales incorrectas.';
                if (nuevosIntentos >= 3) {
                    mensajeError += ' Su cuenta ha sido bloqueada permanentemente. Contacte a soporte.';
                } else {
                    mensajeError += ` Intentos restantes: ${3 - nuevosIntentos}. Al sobrepasar, su cuenta será bloqueada.`;
                }
                return res.status(401).json({ error: mensajeError });
            }

            // 7. Si la contraseña coincide y todo es válido:
            // Resetear intentos fallidos y cambiar estado a 'Activo' si estaba en 'Bloqueado'
            await modelo.resetearIntentosFallidos(documento);

            // 8. Generar un nuevo token de sesión
            const token = modelo.generarTokenSeguro();

            // 9. Guardar el nuevo token en la base de datos
            await modelo.guardarTokenSesion({
                documento: user.documento, // Usa user.documento
                nombresAprendiz: user.nombres,
                token: token,
                dispositivo: "Movil" // Hardcodeado para este modelo/controlador web
            });

            // 10. Enviar respuesta exitosa al cliente
            // Es buena práctica no enviar la contraseña (hash) de vuelta.
            res.status(200).json({
                mensaje: `Bienvenido ${user.nombres}.`, // Mensaje de bienvenida más personal
                token: token
            });

        } catch (err) {
            // Loguear el error completo para depuración en el servidor
            console.error("Error en el Controlador (validarCredencial):", err);
            // Enviar un mensaje de error genérico al cliente por seguridad
            res.status(500).json({ error: 'Error interno del servidor al procesar las credenciales.' });
        }
    }
}

module.exports = LoginApMovilControlador;