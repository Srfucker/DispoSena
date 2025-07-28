const dbService = require('../enlace/Conexion');

class EquipoInternoModelo {
  constructor({ marca, modelo, serial, color, IdPiezaCargador, qrequipoInt }) {
    this.marca = marca;
    this.modelo = modelo;
    this.serial = serial;
    this.color = color;
    this.IdPiezaCargador = IdPiezaCargador;
    this.qrequipoInt = qrequipoInt;
  }

  async guardar() {
    const query = `
      INSERT INTO equipointerno 
      (marca, modelo, serial, color, IdPiezaCargador, qrequipoInt)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const valores = [
      this.marca,
      this.modelo,
      this.serial,
      this.color,
      this.IdPiezaCargador,
      this.qrequipoInt
    ];
    try {
      const resultado = await dbService.query(query, valores);
      return resultado;
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new Error('Campo Duplicado: Ya existe un registro con estos datos únicos.');
      }
      console.error('Error al guardar equipo interno:', err);
      throw err;
    }
  }
}

module.exports = EquipoInternoModelo;
