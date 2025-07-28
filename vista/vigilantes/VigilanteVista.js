const express = require('express');
const controlador = require('../../controlador/vigilantes/LoginVigilanteControlador');
const controladorweb = require('../../controlador/vigilantes/LoginVigilanteWebControlador');

class VigilanteVista {
    constructor() {
        this.router = express.Router();
        this.configurarRutas();
    }

    configurarRutas() {
        // Definimos la ruta POST /instructorlogin usando el método validarCredencial
        this.router.post('/loginvigmovil', (req, res) => controlador.validarCredencial(req, res));
        this.router.post('/loginvigweb', (req, res) => controladorweb.validarCredencial(req, res));
    }

    mostrarRutas() {
        return this.router;
    }
}

module.exports = new VigilanteVista().mostrarRutas();