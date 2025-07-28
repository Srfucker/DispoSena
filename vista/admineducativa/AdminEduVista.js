const express = require('express');
const controlador = require('../../controlador/admineducativa/LoginAdminEduControlador');
const controladorweb = require('../../controlador/admineducativa/LoginAdminEduWebControlador');

class AdminEducativaVista {
    constructor() {
        this.router = express.Router();
        this.configurarRutas();
    }

    configurarRutas() {
        // Definimos la ruta POST /instructorlogin usando el método validarCredencial
        this.router.post('/loginAEmovil', (req, res) => controlador.validarCredencial(req, res));
        this.router.post('/loginAEweb', (req, res) => controladorweb.validarCredencial(req, res));
    }

    mostrarRutas() {
        return this.router;
    }
}

module.exports = new AdminEducativaVista().mostrarRutas();