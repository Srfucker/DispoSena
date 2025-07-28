const dbService = require('../enlace/Conexion');
const bcrypt = require('bcrypt');

class AdminEduModelo {
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
      INSERT INTO funcionarios 
      (tipoDoc, documento, nombres, telefono, correoPersonal, rol, fechaCreacion, creadoPor, llave)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

        try {
            // Hash de la contraseña (llave)
            const hash = await bcrypt.hash(this.llave, 10);
            // Hash del rol (siempre "MesaAyuda" en este caso)
            const hrol = "AdminEducativo";
            const creadop = "Coordinador"; // Definir el creador

            const valores = [
                this.tipoDoc,
                this.documento,
                this.nombres,
                this.telefono,
                this.correoPersonal,
                hrol,
                this.fechaCreacion,
                creadop,
                hash
            ];

            // Ejecutar la consulta en la base de datos
            const resultado = await dbService.query(query, valores);
            return resultado; // Retorna el resultado de la inserción (ej. insertId)
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                throw new Error('Campo Duplicado: Ya existe un registro con estos datos únicos.');
            }
            console.error('Error al guardar funcionario:', err);
            throw err; // Re-lanza el error para que sea manejado por el controlador
        }
    }
}

module.exports = AdminEduModelo;