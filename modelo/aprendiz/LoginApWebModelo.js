const servicio = require('../enlace/Conexion');
const crypto = require('crypto');

class LoginApWebModelo {

    /**
     * Busca un usuario aprendiz por su documento para el proceso de login.
     * @param {string} documento El número de documento del aprendiz.
     * @returns {Object|null} Los datos del aprendiz (idAprendiz, documento, nombres, rol, contrasena_hash, estado, intentosFallidos) o null si no se encuentra.
     * @throws {Error} Si ocurre un error en la base de datos.
     */
    static async buscarUsuarioPorDocumento(documento) {
        const query = 'SELECT idAprendiz, documento, nombres, rol, llave, estado, intentosFallidos FROM aprendiz WHERE documento = ? AND rol = "Aprendiz"';
        try {
            const result = await servicio.query(query, [documento]);
            return result.length ? result[0] : null;
        } catch (err) {
            console.error("Error en Modelo (buscarUsuarioPorDocumento):", err); // Muestra el error real
            throw new Error("Error interno al buscar el aprendiz.");
        }
    }

    /**
     * Genera una cadena alfanumérica segura para usar como token de sesión.
     * @returns {string} El token generado en formato hexadecimal.
     */
    static generarTokenSeguro() {
        return crypto.randomBytes(32).toString('hex');
    }

    /**
     * Guarda un token de sesión en la base de datos para un usuario y dispositivo específico.
     * @param {Object} data - Objeto con los datos del token.
     * @param {string} data.documento - Documento del usuario.
     * @param {string} data.nombresAprendiz - Nombres del aprendiz.
     * @param {string} data.token - El token generado.
     * @param {string} [data.dispositivo="Web"] - El tipo de dispositivo (por defecto "Web").
     * @throws {Error} Si ocurre un error al guardar el token.
     */
    static async guardarTokenSesion({ documento, nombresAprendiz, token, dispositivo = "Web" }) {
        // Si tu tabla tokenaprendiz tiene 'idAprendiz', deberías pasarlo y usarlo aquí
        const query = 'INSERT INTO tokenaprendiz (usuario, nombresAprendiz, token, dispositivo) VALUES (?, ?, ?, ?)';
        try {
            await servicio.query(query, [documento, nombresAprendiz, token, dispositivo]);
        } catch (err) {
            console.error("Error en Modelo (guardarTokenSesion):", err); // Muestra el error real
            throw new Error("Error al generar el token de sesión.");
        }
    }

    /**
     * Incrementa el contador de intentos fallidos para un aprendiz y bloquea si excede el límite.
     * @param {string} documento El documento del aprendiz.
     * @returns {number} El número actual de intentos fallidos.
     * @throws {Error} Si ocurre un error en la base de datos.
     */
    static async incrementarIntentoFallido(documento) {
        try {
            // Incrementar el contador
            await servicio.query('UPDATE aprendiz SET intentosFallidos = intentosFallidos + 1 WHERE documento = ?', [documento]);

            // Obtener el nuevo conteo de intentos y el estado
            const result = await servicio.query('SELECT intentosFallidos, estado FROM aprendiz WHERE documento = ?', [documento]);
            const data = result[0] || { intentosFallidos: 0, estado: 'Activo' };
            const intentosActuales = data.intentosFallidos;

            // Si alcanzó o superó el límite, bloquear al usuario
            if (intentosActuales >= 3 && data.estado !== 'Bloqueado') {
                await servicio.query('UPDATE aprendiz SET estado = "Bloqueado" WHERE documento = ?', [documento]);
            }
            return intentosActuales;
        } catch (err) {
            console.error("Error en Modelo (incrementarIntentoFallido):", err); // Muestra el error real
            throw new Error("Error al registrar el intento fallido.");
        }
    }

    /**
     * Restablece el contador de intentos fallidos a cero y activa la cuenta.
     * @param {string} documento El documento del aprendiz.
     * @throws {Error} Si ocurre un error en la base de datos.
     */
    static async resetearIntentosFallidos(documento) {
        const query = 'UPDATE aprendiz SET intentosFallidos = 0, estado = "Activo" WHERE documento = ?';
        try {
            await servicio.query(query, [documento]);
        } catch (err) {
            console.error("Error en Modelo (resetearIntentosFallidos):", err); // Muestra el error real
            throw new Error("Error al restablecer intentos fallidos.");
        }
    }

    /**
     * Busca un token de sesión activo para un usuario y dispositivo.
     * @param {string} documento El documento del usuario.
     * @param {string} [dispositivo="Web"] El tipo de dispositivo (por defecto "Web").
     * @returns {Object|null} El token encontrado o null.
     * @throws {Error} Si ocurre un error en la base de datos.
     */
    static async buscarTokenSesionActiva(documento, dispositivo = "Web") {
        const query = 'SELECT usuario, nombresAprendiz, token, dispositivo FROM tokenaprendiz WHERE usuario = ? AND dispositivo = ?';
        try {
            const result = await servicio.query(query, [documento, dispositivo]);
            return result.length ? result[0] : null;
        } catch (err) {
            console.error("Error en Modelo (buscarTokenSesionActiva):", err); // Muestra el error real
            throw new Error("Error al verificar sesión activa.");
        }
    }
}

module.exports = LoginApWebModelo;