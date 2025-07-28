const dbService = require('../enlace/Conexion');

class SalasModelo {
    async crearSala({ nombreSala, descripcion, estado }) {
        const query = `INSERT INTO salas (nombreSala, descripcion, estado) VALUES (?, ?, ?)`;
        return dbService.query(query, [nombreSala, descripcion, estado || 'Disponible']);
    }

    async obtenerSalas() {
        const query = `SELECT * FROM salas`;
        return dbService.query(query);
    }

    async obtenerSalaPorId(idSala) {
        const query = `SELECT * FROM salas WHERE idSala = ?`;
        return dbService.query(query, [idSala]);
    }

    async actualizarSala(idSala, { nombreSala, descripcion, estado }) {
        const query = `UPDATE salas SET nombreSala = ?, descripcion = ?, estado = ? WHERE idSala = ?`;
        return dbService.query(query, [nombreSala, descripcion, estado, idSala]);
    }

    async eliminarSala(idSala) {
        const query = `DELETE FROM salas WHERE idSala = ?`;
        return dbService.query(query, [idSala]);
    }

    async buscarSalas(filtros) {
        let query = 'SELECT * FROM salas WHERE 1=1';
        const params = [];
        if (filtros.idSala) {
            query += ' AND idSala = ?';
            params.push(filtros.idSala);
        }
        if (filtros.nombreSala) {
            query += ' AND nombreSala LIKE ?';
            params.push(`%${filtros.nombreSala}%`);
        }
        if (filtros.descripcion) {
            query += ' AND descripcion LIKE ?';
            params.push(`%${filtros.descripcion}%`);
        }
        if (filtros.estado) {
            query += ' AND estado = ?';
            params.push(filtros.estado);
        }
        return dbService.query(query, params);
    }
}

module.exports = new SalasModelo();