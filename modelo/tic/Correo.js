const nodemailer = require('nodemailer');

class CorreoControlador {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  async enviarBienvenida(nombres, correo, tasunto) {
    const asunto = `¡Bienvenido a la plataforma del ${tasunto}!`;
    const texto = `Hola ${nombres}, gracias por registrarte.\n\nTu usuario para acceder al sistema es: ${correo}`;
    const html = `
      <h2>¡Hola ${nombres}!</h2>
      <p>Gracias por registrarte en nuestra panadería.</p>
      <p><strong>Tu usuario para acceder:</strong> ${correo}</p>
      <p>¡Te esperamos pronto!</p>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: asunto,
      text: texto,
      html: html
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error al enviar correo de bienvenida:', error.message);
      throw new Error('No se pudo enviar el correo de bienvenida');
    }
  }
}

module.exports = new CorreoControlador();