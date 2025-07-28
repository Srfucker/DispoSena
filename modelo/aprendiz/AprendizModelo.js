const dbService = require('../enlace/Conexion');
const bcrypt = require('bcrypt');

class AprendizModelo {
    constructor({ tipoDoc, documento, nombres, telefono, correoPersonal, llave }) {
        this.tipoDoc = tipoDoc;
        this.documento = documento;
        this.nombres = nombres;
        this.telefono = telefono;
        this.correoPersonal = correoPersonal;
        this.llave = llave;
        this.fechaCreacion = new Date();
    }

    async guardar() {
        const query = `
      INSERT INTO aprendiz 
      (tipoDoc, documento, nombres, telefono, correoPersonal, rol, fechaCreacion, llave)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

        try {
            const hash = await bcrypt.hash(this.llave, 10);
            const hrol = "Aprendiz";

            const valores = [
                this.tipoDoc,
                this.documento,
                this.nombres,
                this.telefono,
                this.correoPersonal,
                hrol,
                this.fechaCreacion,
                hash
            ];

            const resultado = await dbService.query(query, valores);
            return resultado;
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                throw new Error('Datos Duplicados: Ya existe sus datos Aprendiz.');
            }
            console.error('Error al guardar Aprendiz:', err);
            throw err;
        }
    }

    // NUEVA FUNCIÓN CONSULTAR
    static async consultar(documento) {
        const query = `
      SELECT * FROM aprendiz 
      WHERE documento = ? AND rol = 'Aprendiz'
    `;

        try {
            const [resultado] = await dbService.query(query, [documento]);
            if (resultado.length === 0) {
                //return 'no se encontro Aprendiz:'; // No se encontró ningún aprendiz
                return 'no se encontro Aprendiz:';
            }
            return resultado[0];

        } catch (err) {
            throw 'no se encontro Aprendiz:';
        }
    }
}

module.exports = AprendizModelo;