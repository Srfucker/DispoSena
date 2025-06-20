const express = require('express');
const MesaAyudaControlador = require('../../controlador/coordinador/MesaAyudaControlador'); // Importa el controlador real

class MesaAyudaVista {
  constructor() {
    this.router = express.Router(); // Crea una nueva instancia del enrutador de Express
    this.controlador = new MesaAyudaControlador(); // Crea una instancia del controlador
    this.configurarRutas(); // Llama al método para configurar las rutas al instanciar la clase
  }

  /**
   * Configura las rutas para la Mesa de Ayuda.
   * Utiliza funciones flecha para asegurar que 'this' dentro del callback
   * se refiera correctamente a la instancia del controlador.
   */
  configurarRutas() {    // Ruta POST para crear un nuevo funcionario
    // La URL completa será http://localhost:4545/funcionario
    this.router.post('/funcionario', (req, res) => this.controlador.crearFuncionario(req, res));

    // Puedes añadir más rutas aquí si es necesario, por ejemplo:
    // this.router.get('/funcionarios', (req, res) => this.controlador.obtenerTodosLosFuncionarios(req, res));
    // this.router.get('/funcionario/:id', (req, res) => this.controlador.obtenerFuncionarioPorId(req, res));
  }

  /**
   * Expone el enrutador configurado para que pueda ser utilizado por Express.
   * @returns {express.Router} El enrutador de Express.
   */
  mostrarRutas(){
    return this.router;
  }
}

// Exporta una instancia del enrutador configurado.
// Esto permite que 'servidor.js' lo importe directamente y lo use con app.use().
module.exports = new MesaAyudaVista().mostrarRutas();