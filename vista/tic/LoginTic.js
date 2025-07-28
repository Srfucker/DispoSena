const express = require('express');
const controlador = require('../../controlador/tic/LoginTicWebControlador');
const controladormovil = require('../../controlador/tic/LoginTicMovilControlador');

class loginTic {
  constructor() {
    this.router = express.Router();
    this.configurarRutas();
  }

  configurarRutas() {
    // Definimos la ruta POST /tic usando el método validarCredencial
    this.router.post('/ticloginweb', (req, res) => controlador.validarCredencial(req, res));
     this.router.post('/ticloginmovil', (req, res) => controladormovil.validarCredencial(req, res));
    // this.router.post('/instructorloginweb', (req, res) => controladorweb.validarCredencial(req, res));
  }

  mostrarRutas() {
    return this.router;
  }
}

module.exports = new loginTic().mostrarRutas();