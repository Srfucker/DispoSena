const SalasModelo = require('../../modelo/coordinador/SalasModelo');

class SalasControlador {
    async crearSala(req, res) {
        try {
            const { nombreSala, descripcion, estado } = req.body;
            // Verifica si ya existe una sala con los mismos datos
            const existentes = await SalasModelo.buscarSalas({ nombreSala, descripcion, estado });
            if (existentes.length > 0) {
                return res.status(400).json({ error: 'Ya existe una sala con esos datos.' });
            }
            const resultado = await SalasModelo.crearSala({ nombreSala, descripcion, estado });
            res.status(201).json({ mensaje: 'Sala creada', id: resultado.insertId });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async obtenerSalas(req, res) {
        try {
            const salas = await SalasModelo.obtenerSalas();
            res.json(salas);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async obtenerSalaPorId(req, res) {
        try {
            const { idSala } = req.params;
            const sala = await SalasModelo.obtenerSalaPorId(idSala);
            res.json(sala[0] || {});
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async actualizarSala(req, res) {
        try {
            const { idSala } = req.params;
            const { nombreSala, descripcion, estado } = req.body;
            // Verifica si ya existe otra sala con los mismos datos
            const existentes = await SalasModelo.buscarSalas({ nombreSala, descripcion, estado });
            // Filtra para excluir la sala que se está editando
            const duplicada = existentes.find(sala => sala.idSala != idSala);
            if (duplicada) {
                return res.status(400).json({ error: 'Ya existe otra sala con esos datos.' });
            }
            await SalasModelo.actualizarSala(idSala, { nombreSala, descripcion, estado });
            res.json({ mensaje: 'Sala actualizada' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async eliminarSala(req, res) {
        try {
            const { idSala } = req.params;
            await SalasModelo.eliminarSala(idSala);
            res.json({ mensaje: 'Sala eliminada' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async buscarSalas(req, res) {
        try {
            const filtros = req.query;
            const salas = await SalasModelo.buscarSalas(filtros);
            res.json(salas);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new SalasControlador();