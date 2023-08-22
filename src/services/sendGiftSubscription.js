const { USER_NODEMAILER } = require('../utils/env');
const transporter = require('../config/nodemailer');

const sendGiftSubscription = async (userToSubscribe, endDate, payerInfo) => {
  const htmlContent = `
    <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
      <h2 style="color: #333;">¡Has recibido una suscripción de regalo!</h2>
      <p>Estamos encantados de informarte que alguien te ha regalado una suscripción.</p>
      <h3>Detalles de la suscripción de regalo:</h3>
      <ul>
        <li>Nombre de la persona que te regaló: ${payerInfo.name} ${payerInfo.last_name}</li>
        <li>Fecha de Fin de Suscripción: ${endDate}</li>
      </ul>
      <p>Disfruta de tu suscripción. Si tienes alguna pregunta, no dudes en contactarnos.</p>
    </div>
  `;
  const message = {
    from: USER_NODEMAILER,
    to: userToSubscribe.email,
    subject: '¡Has recibido una suscripción de regalo para BookBuster!',
    html: htmlContent,
  };
  const info = await transporter.sendMail(message);
  return info;
};

module.exports = sendGiftSubscription;
