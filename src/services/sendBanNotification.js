const { USER_NODEMAILER } = require('../utils/env');
const transporter = require('../config/nodemailer');

const sendBanNotification = async (user, duration, reason) => {
  const htmlContent = `
      <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
      <h2 style="color: #333;">Notificación de Bloqueo de Cuenta</h2>
      <p>Estimado/a ${user.name} ${user.last_name},</p>
      <p>Lamentamos informarte que tu cuenta ha sido bloqueada por la siguiente razón:</p>
      <p>${reason}</p>
      <p>El bloqueo de tu cuenta estará vigente por un período de ${duration} días.</p>
      <p>Si crees que ha habido un error o necesitas más información, por favor contáctanos.</p>
    </div>
  `;

  const message = {
    from: USER_NODEMAILER,
    to: user.email,
    subject: 'Notificación de Bloqueo de Cuenta',
    html: htmlContent,
  };

  const info = await transporter.sendMail(message);

  return info;
};

module.exports = sendBanNotification;
