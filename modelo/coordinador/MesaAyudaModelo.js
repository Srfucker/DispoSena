const dbService = require('./enlace/Conexion');
const bcrypt = require('bcrypt');

class MesaAyudaModelo {
  constructor({ tipodoc, doc, nombres, llave }) {
    this.tipodoc = tipodoc;
    this.doc = doc
    this.nombres = nombres;
    this.llave = llave;
    this.FechaCreacion = new Date().toISOString();
    
  }

  async guardar() {
    const query = `
      INSERT INTO Funcionarios
      (tipodoc, doc, nombres, rol, FechaCreacion, CradoPor, llave)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    try {
      const hash = await bcrypt.hash(this.llave, 10);
      const hrol = await bcrypt.hash("MesaAyuda", 15);
      const creadop = "Admin"
      const valores = [
        this.tipodoc,
        this.doc,
        this.nombres,
        hrol,
        this.FechaCreacion,
        creadop,
        hash,
        new Date().toISOString()
      ];

      return await dbService.query(query, valores);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = MesaAyudaModelo;