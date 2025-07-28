const EquipoInternoModelo = require('../../modelo/tic/EquipoInternoModelo');

const crearEquipoInterno = async (req, res) => {
  try {
    const { t1: marca, t2: modelo, t3: serial, t4: color, t5: IdPiezaCargador, t6: qrequipoInt } = req.body;
    const equipo = new EquipoInternoModelo({
      marca,
      modelo,
      serial,
      color,
      IdPiezaCargador,
      qrequipoInt
    });
    const resultado = await equipo.guardar();
    res.status(201).json({ mensaje: 'Equipo creado exitosamente', resultado });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { crearEquipoInterno };
