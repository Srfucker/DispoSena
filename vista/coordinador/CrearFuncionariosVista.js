const express = require('express');
const MesaAyudaControlador = require('../../controlador/coordinador/MesaAyudaControlador'); // Importa el controlador real
const InstructorControlador = require('../../controlador/coordinador/InstructorControlador');
const AdminEduControlador = require('../../controlador/coordinador/AdminEduControlador');
const VigilanteControlador = require('../../controlador/coordinador/VigilanteControlador'); // Importa el controlador de vigilantes

class CrearFuncionarioVista {
    constructor() {
        this.router = express.Router(); // Crea una nueva instancia del enrutador de Express
        this.controlador = new MesaAyudaControlador(); // Crea una instancia del controlador
        this.controldocente = new InstructorControlador(); // Crea una instancia del controlador
        this.controladmin = new AdminEduControlador(); // Crea una instancia del controlador
        this.controlvigi = new VigilanteControlador(); // Crea una instancia del controlador de vigilantes
        this.configurarRutas(); // Llama al método para configurar las rutas al instanciar la clase
    }


    configurarRutas() {    // Ruta POST para crear un nuevo funcionario
        // La URL completa será http://localhost:4545/funcionario
        this.router.post('/funcionario', (req, res) => this.controlador.crearFuncionario(req, res));
        this.router.post('/instructores', (req, res) => this.controldocente.crearInstructores(req, res));
        this.router.post('/admin', (req, res) => this.controladmin.crearAdmin(req, res));
        this.router.post('/vigilantes', (req, res) => this.controlvigi.crearVigilante(req, res));
    }

    mostrarRutas() {
        return this.router;
    }
}

// Exporta una instancia del enrutador configurado.
// Esto permite que 'servidor.js' lo importe directamente y lo use con app.use().
module.exports = new CrearFuncionarioVista().mostrarRutas();