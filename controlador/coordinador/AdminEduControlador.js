const AdminEduModelo = require('../../modelo/coordinador/AdminEduModelo');
const Validador = require('../Validador');


class AdminEduControlador {
    constructor() {
        this.validador = new Validador();
    }

    /**
     * Maneja la solicitud para crear un nuevo funcionario.
     * @param {Object} req - Objeto de solicitud de Express.
     * @param {Object} res - Objeto de respuesta de Express.
     */
    async crearAdmin(req, res) {
        // Desestructurar los datos del cuerpo de la solicitud
        const { t1: tipoDoc, t2: documento, t3: nombres, t4: telefono, t5: correoPersonal, t6: llave } = req.body;

        // Validar los datos de entrada
        // 'errorValidacion' será un string si hay un error, o null si no hay errores.
        const errorValidacion = this.validador.validarTodos(tipoDoc, documento, nombres, telefono, correoPersonal, llave);

        // Si 'errorValidacion' no es null (es decir, contiene un mensaje de error)
        if (errorValidacion) {
            return res.status(400).json({ error: errorValidacion }); // Retorna el mensaje de error único
        }

        try {
            // Crear una nueva instancia del modelo de funcionario
            const nuevoFuncionario = new AdminEduModelo({
                tipoDoc: tipoDoc,
                documento: documento,
                nombres: nombres,
                telefono: telefono,
                correoPersonal: correoPersonal,
                llave: llave
            });

            // Guardar el nuevo funcionario en la base de datos
            const resultado = await nuevoFuncionario.guardar();
            return res.status(201).json({
                mensaje: 'Admin Educativo creado con éxito',
                id: resultado.insertId // Asumiendo que dbService.query devuelve insertId
            });

        } catch (err) {
            // Manejo de errores específicos del modelo (ej. campo duplicado)
            if (err.message && err.message.includes('Campo Duplicado: ')) {
                return res.status(409).json({ // 409 Conflict
                    error: 'Ya existe un Admin Educativo con estos datos. Por favor, verifique el tipo de documento y el número de documento.'
                });
            }
            // Manejo de otros errores internos del servidor
            console.error('Error en AdminEduControlador.crearAdmin:', err);
            return res.status(500).json({ error: 'Error interno del servidor: ' + err.message });
        }
    }
}

module.exports = AdminEduControlador;