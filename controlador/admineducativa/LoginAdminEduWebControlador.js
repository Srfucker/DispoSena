const bcrypt = require('bcrypt');
const modelo = require('../../modelo/admineducativa/LoginAdminEduWebModelo');

class LoginAdminEduWebControlador {
    constructor() {
        if (LoginAdminEduWebControlador.instance) {
            return LoginAdminEduWebControlador.instance;
        }
        LoginAdminEduWebControlador.instance = this;
    }

    async validarCredencial(req, res) {
        const { t2: documento, t6: llave } = req.body;

        if (!documento || !llave) {
            return res.status(400).json({ error: 'Documento y contraseña son obligatorios.' });
        }

        try {
            const user = await modelo.buscarUsuarioPorDocumento(documento);

            if (!user) {
                return res.status(401).json({ error: 'Credenciales inválidas.' });
            }

            if (user.estado === 'Bloqueado') {
                return res.status(403).json({ error: 'Su cuenta está bloqueada debido a múltiples intentos fallidos. Consulte con el administrador.' });
            }

            const sesionActiva = await modelo.buscarTokenSesionActiva(documento, "Web");
            if (sesionActiva) {
                return res.status(401).json({ error: 'Ya existe una sesión activa para este usuario en un dispositivo móvil. Cierre la sesión existente.' });
            }

            const contrasenaCoincide = await bcrypt.compare(llave, user.llave);

            if (!contrasenaCoincide) {
                const nuevosIntentos = await modelo.incrementarIntentoFallido(documento);
                let mensajeError = 'Credenciales incorrectas.';
                if (nuevosIntentos >= 3) {
                    mensajeError += ' Su cuenta ha sido bloqueada permanentemente. Contacte a soporte.';
                } else {
                    mensajeError += ` Intentos restantes: ${3 - nuevosIntentos}. Al sobrepasar, su cuenta será bloqueada.`;
                }
                return res.status(401).json({ error: mensajeError });
            }

            await modelo.resetearIntentosFallidos(documento);

            const token = modelo.generarTokenSeguro();

            await modelo.guardarTokenSesion({
                documento: user.documento,
                nombres: user.nombres,
                token: token,
                dispositivo: "Web"
            });

            return res.status(200).json({
                mensaje: `Bienvenido ${user.nombres}.`,
                token: token
            });

        } catch (err) {
            console.error("Error en el Controlador (validarCredencial):", err);
            return res.status(500).json({ error: 'Error interno del servidor al procesar las credenciales.' });
        }
    }
}

// Exportar la única instancia de la clase
module.exports = new LoginAdminEduWebControlador();