const express = require('express');
const SalasControlador = require('../../controlador/coordinador/SalasControlador');

class SalasVista {
    constructor() {
        this.router = express.Router();
        this.configurarRutas();
    }

    configurarRutas() {
        this.router.post('/salas', (req, res) => SalasControlador.crearSala(req, res));
        this.router.get('/salas', (req, res) => SalasControlador.obtenerSalas(req, res));
        this.router.get('/salas/buscar', (req, res) => SalasControlador.buscarSalas(req, res));
        this.router.get('/salas/:idSala', (req, res) => SalasControlador.obtenerSalaPorId(req, res));
        this.router.put('/salas/:idSala', (req, res) => SalasControlador.actualizarSala(req, res));
        this.router.delete('/salas/:idSala', (req, res) => SalasControlador.eliminarSala(req, res));
    }

    mostrarRutas() {
        return this.router;
    }
}

module.exports = new SalasVista().mostrarRutas();