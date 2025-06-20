const express = require('express');
// Importa el controlador real (que tiene un método estático para el login)
const LoginFuncionarioControlador = require('../../controlador/tic/LoginFuncionarioControlador'); 

/**
 * @class LoginTic
 * @description Clase para configurar las rutas de Express relacionadas con el login de funcionarios.
 */
class LoginTic {
  /**
   * Constructor de la clase LoginTic.
   * Inicializa el enrutador de Express y configura las rutas.
   */
  constructor() {
    this.router = express.Router(); // Crea una nueva instancia del enrutador de Express
    // Ya no necesitas crear una instancia de LoginFuncionarioControlador
    // porque el método 'loginFuncionario' es estático.
    this.configurarRutas(); // Llama al método para configurar las rutas al instanciar la clase
  }

  /**
   * Configura las rutas específicas para el módulo de login.
   * Asigna el método estático del controlador a la ruta POST.
   */
  configurarRutas() {
    // Ruta POST para el login del funcionario
    // La URL completa será algo como http://localhost:PORT/api/seciontic
    // Llamamos directamente al método estático del controlador
    this.router.post('/seciontic', LoginFuncionarioControlador.loginFuncionario);
    // Nota: No se usa `(req, res) => this.controlador.loginFuncionario(req, res)`
    // porque 'loginFuncionario' es estático y no necesita una instancia,
    // y Express automáticamente pasa `req` y `res` al método estático.
  }

  /**
   * Expone el enrutador configurado para ser utilizado por la aplicación principal de Express.
   * @returns {express.Router} El enrutador de Express con las rutas configuradas.
   */
  mostrarRutas() {
    return this.router;
  }
}

// Exporta una instancia del enrutador configurado.
// Esto permite que 'servidor.js' (o tu archivo principal) lo importe directamente y lo use con app.use().
module.exports = new LoginTic().mostrarRutas();