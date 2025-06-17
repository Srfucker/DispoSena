const express = require('express');
const conMesa = require('../../Disposenappi/controlador/MesaAyudaControlador');

class MesaAyudaVista {
  constructor() {
    this.router = express.Router();
    this.controlador = new conCliente();
    this.configurarRutas();
  }

  configurarRutas() {
    this.router.post('/funcionarios', (req, res) => this.controlador.crearFuncionario(req, res));
  }

  mostrarRutas() {
    return this.router;
  }
}

module.exports = new MesaAyudaVista().mostrarRutas();