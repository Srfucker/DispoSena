const express = require('express');
const controlador = require('../../controlador/instructor/LoginInstructorControlador');
const controladorweb = require('../../controlador/instructor/LoginInstructorWebControlador'); 

class InstructoresVista {
  constructor() {
    this.router = express.Router();
    this.configurarRutas();
  }

  configurarRutas() {
    // Definimos la ruta POST /instructorlogin usando el método validarCredencial
    this.router.post('/instructorlogin', (req, res) => controlador.validarCredencial(req, res));
     this.router.post('/instructorloginweb', (req, res) => controladorweb.validarCredencial(req, res));
  }

  mostrarRutas() {
    return this.router;
  }
}

module.exports = new InstructoresVista().mostrarRutas();