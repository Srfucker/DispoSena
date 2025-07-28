const express = require('express');
const { crearEquipoInterno } = require('../../controlador/tic/EquipoInternoControlador');
const dbService = require('../../modelo/enlace/Conexion');
const { mostrarEquipoInterno } = require('../../vista/tic/EquipoInternoVista');

const router = express.Router();

// Crear equipo interno
router.post('/equipointerno', crearEquipoInterno);

// Obtener equipo interno por ID
router.get('/equipointerno/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = 'SELECT * FROM equipointerno WHERE idEquipo = ?';
    const resultado = await dbService.query(query, [id]);
    if (resultado.length === 0) {
      return res.status(404).json({ error: 'Equipo no encontrado' });
    }
    res.json(mostrarEquipoInterno(resultado[0]));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar todos los equipos internos
router.get('/equipointerno', async (req, res) => {
  try {
    const query = 'SELECT * FROM equipointerno';
    const resultado = await dbService.query(query);
    res.json(resultado.map(mostrarEquipoInterno));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar equipo interno por ID
router.put('/equipointerno/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { t1: marca, t2: modelo, t3: serial, t4: color, t5: IdPiezaCargador, t6: qrequipoInt } = req.body;
    const query = `UPDATE equipointerno SET marca = ?, modelo = ?, serial = ?, color = ?, IdPiezaCargador = ?, qrequipoInt = ? WHERE idEquipo = ?`;
    const valores = [marca, modelo, serial, color, IdPiezaCargador, qrequipoInt, id];
    const resultado = await dbService.query(query, valores);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: 'Equipo no encontrado' });
    }
    res.json({ mensaje: 'Equipo actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar equipo interno por ID
router.delete('/equipointerno/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = 'DELETE FROM equipointerno WHERE idEquipo = ?';
    const resultado = await dbService.query(query, [id]);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: 'Equipo no encontrado' });
    }
    res.json({ mensaje: 'Equipo eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
