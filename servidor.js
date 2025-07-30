const express = require('express');
const cors = require('cors');
const rutaCordi = require('./vista/coordinador/CrearFuncionariosVista');
const rutaprendiz = require('./vista/aprendiz/AprendizVista');
const rutainstru = require('./vista/instructor/InstructoresVista');
const rutaadminedu = require('./vista/admineducativa/AdminEduVista');
const rutavigi = require('./vista/vigilantes/VigilanteVista');
const rutaTic = require('./vista/tic/LoginTic'); 
const SalasVista = require('./vista/coordinador/SalasVista');
const rutaEquipoInterno = require('./vista/tic/EquipoInternoRouter');
const app = express();
const PORT = process.env.PORT || 4545;

// Middleware para CORS
app.use(cors({
    origin: '*', // Permite solicitudes de cualquier origen. Considera restringirlo en producción.
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true // Habilita el envío de cookies de origen cruzado
}));

// Middleware para parsear solicitudes JSON y URL-encoded
app.use(express.json()); // Para parsear cuerpos de solicitud con Content-Type: application/json
app.use(express.urlencoded({ extended: true })); // Para parsear cuerpos de solicitud con Content-Type: application/x-www-form-urlencoded

// Rutas de la API. El router 'rutaMesa' se montará en la raíz '/'.
// Las rutas definidas dentro de 'rutaMesa' serán relativas a esta raíz.
app.use('/', rutaCordi);
app.use('/', rutaTic);
app.use('/', rutaprendiz);
app.use('/', rutainstru);
app.use('/', rutaadminedu);
app.use('/', rutavigi);
app.use('/', rutaEquipoInterno);

// Manejo de errores global (opcional, pero buena práctica)
app.use((err, req, res, next) => {
    console.error(err.stack); // Imprime el stack de errores para depuración
    res.status(500).send('¡Algo salió mal!'); // Envía una respuesta de error genérica al cliente
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.get('', (req, res) => {
  res.json({ mensaje: '¡Backend conectado correctamente!' });
});
