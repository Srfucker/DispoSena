// AprendizVista.js
const express = require('express');
const AprendizControlador = require('../../controlador/aprendiz/AprendizControlador');
// Importa directamente la CLASE LoginApWebControlador, no necesitas instanciarla si sus métodos son estáticos
const LoginApWebControlador = require('../../controlador/aprendiz/LoginApWebControlador');
const LoginApMovilControlador = require('../../controlador/aprendiz/LoginApMovilControlador');

class AprendizVista {
  constructor() {
    this.router = express.Router();
    // Instancia AprendizControlador si sus métodos NO son estáticos
    this.controlador = new AprendizControlador();
    // No es necesario instanciar LoginApWebControlador si sus métodos son estáticos.
    // this.controladorApW = new LoginApWebControlador(); // Eliminamos esta línea
    this.configurarRutas();
  }

  configurarRutas() {
    // Rutas que usan la instancia de AprendizControlador
    this.router.post('/crearaprendiz', (req, res) => this.controlador.crearAprendiz(req, res));
    this.router.post('/bporide', (req, res) => this.controlador.verificarAprendiz(req, res));

    // Ruta que usa el método estático de LoginApWebControlador directamente
    this.router.post('/loginweb', LoginApWebControlador.validarCredencial); // <--- CAMBIO AQUÍ
    this.router.post('/loginmovil', LoginApMovilControlador.validarCredencial);
  }

  mostrarRutas(){
    return this.router;
  }
}

module.exports = new AprendizVista().mostrarRutas();