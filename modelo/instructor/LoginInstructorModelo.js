const servicio = require('../enlace/Conexion');
const crypto = require('crypto');

class LoginInstructorModelo {
    constructor() {
        if (LoginInstructorModelo.instance) {
            return LoginInstructorModelo.instance;
        }
        LoginInstructorModelo.instance = this;
    }

    async buscarUsuarioPorDocumento(documento) {
        const query = 'SELECT idFuncionario, documento, nombres, rol, llave, estado, intentosFallidos FROM funcionarios WHERE documento = ? AND rol = "instructor"';
        try {
            const result = await servicio.query(query, [documento]);
            return result.length ? result[0] : null;
        } catch (err) {
            console.error("Error en Modelo (buscarUsuarioPorDocumento):", err);
            throw new Error("Error interno al buscar el instructor.");
        }
    }

    generarTokenSeguro() {
        return crypto.randomBytes(32).toString('hex');
    }

    async guardarTokenSesion({ documento, nombres, token, dispositivo = "Movil" }) {
        const query = 'INSERT INTO tokenfuncionario (usuarioFuncionario, nombresFuncionario, rol, token, dispositivo) VALUES (?, ?, ?, ?, ?)';
        try {
            await servicio.query(query, [documento, nombres, "Instructor", token, dispositivo]);
        } catch (err) {
            console.error("Error en Modelo (guardarTokenSesion):", err);
            throw new Error("Error al generar el token de sesión.");
        }
    }

    async incrementarIntentoFallido(documento) {
        try {
            await servicio.query('UPDATE funcionarios SET intentosFallidos = intentosFallidos + 1 WHERE documento = ?', [documento]);

            const result = await servicio.query('SELECT intentosFallidos, estado FROM funcionarios WHERE documento = ?', [documento]);
            const data = result[0] || { intentosFallidos: 0, estado: 'Activo' };
            const intentosActuales = data.intentosFallidos;

            if (intentosActuales >= 3 && data.estado !== 'Bloqueado') {
                await servicio.query('UPDATE funcionarios SET estado = "Bloqueado" WHERE documento = ?', [documento]);
            }

            return intentosActuales;
        } catch (err) {
            console.error("Error en Modelo (incrementarIntentoFallido):", err);
            throw new Error("Error al registrar el intento fallido.");
        }
    }

    async resetearIntentosFallidos(documento) {
        const query = 'UPDATE funcionarios SET intentosFallidos = 0, estado = "Activo" WHERE documento = ?';
        try {
            await servicio.query(query, [documento]);
        } catch (err) {
            console.error("Error en Modelo (resetearIntentosFallidos):", err);
            throw new Error("Error al restablecer intentos fallidos.");
        }
    }

    async buscarTokenSesionActiva(documento, dispositivo = "Movil") {
        const query = 'SELECT usuarioFuncionario, nombresFuncionario, token, dispositivo FROM tokenfuncionario WHERE usuarioFuncionario = ? AND dispositivo = ?';
        try {
            const result = await servicio.query(query, [documento, dispositivo]);
            return result.length ? result[0] : null;
        } catch (err) {
            console.error("Error en Modelo (buscarTokenSesionActiva):", err);
            throw new Error("Error al verificar sesión activa.");
        }
    }
}

// Exportar una única instancia
module.exports = new LoginInstructorModelo();