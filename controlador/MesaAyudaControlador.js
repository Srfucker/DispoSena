const Cliente = require('../../modelo/ClienteModelo');
const ValidadorCliente = require('./ValidadorCliente');
const CorreoControlador = require('../CorreoControlador');

class ClienteControlador {
  constructor() {
    this.validador = new ValidadorCliente();
  }

  async crearCliente(req, res) {
    const { t1: doc, t2: nom, t3: tel, t4: email, t5: contra } = req.body;

    const errores = this.validador.validarTodos(doc, nom, tel, email, contra);
    if (errores.length > 0) {
      return res.status(400).json({ error: errores });
    }

    try {
      const nuevoCliente = new Cliente({
        documento: doc,
        nombres: nom,
        telefono: tel,
        correo: email,
        contrasena: contra
      });

      const resultado = await nuevoCliente.guardar();

      // Enviar correo de bienvenida
      try {
       await CorreoControlador.enviarBienvenida(nom, email);
      } catch (correoError) {
        console.warn('Usuario creado, pero el correo no fue enviado:', correoError.message);
      }

      return res.status(201).json({
        mensaje: 'Usuario creado con éxito',
        id: resultado.insertId
      });

    } catch (err) {
      if (err.message.includes('Duplicate entry')) {
        return res.status(409).json({
          error: 'Ya existe un usuario con estos datos. Intenta recuperar tu cuenta o iniciar sesión.'
        });
      }
      return res.status(500).json({ error: 'Error no se pudo: ' + err.message });
    }
  }
}

module.exports = ClienteControlador;