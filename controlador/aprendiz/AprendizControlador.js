const AprendizModelo = require('../../modelo/aprendiz/AprendizModelo');
const Validador = require('../Validador');


class AprendizControlador {
  constructor() {
    this.validador = new Validador();
  }

  /**
   * Maneja la solicitud para crear un nuevo funcionario.
   * @param {Object} req - Objeto de solicitud de Express.
   * @param {Object} res - Objeto de respuesta de Express.
   */
  async crearAprendiz(req, res) {
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
      const nuevoAprendiz = new AprendizModelo({
        tipoDoc: tipoDoc,
        documento: documento,
        nombres: nombres,
        telefono: telefono,
        correoPersonal: correoPersonal,
        llave: llave
      });

      // Guardar el nuevo funcionario en la base de datos
      const resultado = await nuevoAprendiz.guardar();
      return res.status(201).json({
        mensaje: 'Aprendiz creado con éxito',
        id: resultado.insertId // Asumiendo que dbService.query devuelve insertId
      });

    } catch (err) {
      // Manejo de errores específicos del modelo (ej. campo duplicado)
      if (err.message && err.message.includes('Campo Duplicado: ')) {
        return res.status(409).json({ // 409 Conflict
          error: 'Ya existe un Aprendiz con estos datos. Por favor, verifique el tipo de documento y el número de documento.'
        });
      }
      // Manejo de otros errores internos del servidor
      console.error('Error en AprendizControlador.crearAprendiz:', err);
      return res.status(500).json({ error: 'Error interno del servidor: ' + err.message });
    }
  }

  async verificarAprendiz(req, res) {
    const { t2 } = req.body;
    const errorValidacion = this.validador.validarDocu(t2); // Asumo que esto ya funciona bien

    if (errorValidacion) {
      return res.status(400).json({ message: errorValidacion });
    }

    try {
      const resultado = await AprendizModelo.consultar(t2);

      // Verificamos si el resultado es EXACTAMENTE la cadena de "no encontrado"
      if (resultado === 'no se encontro Aprendiz:') {
        // Significa que la identificación NO existe, está disponible para registro.
        return res.status(200).json({ message: '✅ ¡Identificación disponible! Será redirigido para registrar.' });
      } else {
        // Si no es la cadena, asumimos que encontró un aprendiz.
        return res.status(409).json({ message: 'Ya existe un aprendiz con esta identificación. No se puede registrar nuevamente.' });
      }
    } catch (error) {
    
      return res.status(200).json({ message: '✅ ¡Identificación disponible! Será redirigido para registrar.'  });
    }
}
}

module.exports = AprendizControlador;