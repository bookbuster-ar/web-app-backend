const { USER_NODEMAILER } = require('../utils/env');
const transporter = require('../config/nodemailer');

const sendSuccessfulSubscription = async (
  newTransaction,
  userData,
  endDate,
  preapproval_id
) => {
  const {
    mercadopago_transaction_id,
    transaction_date,
    transaction_status,
    total_amount,
  } = newTransaction;

  const htmlContent = `
  <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
    <h2 style="color: #333;">Gracias por suscribirte, ${userData.name} ${userData.last_name}!</h2>
    <p>Estamos encantados de informarte que tu suscripción ha sido procesada exitosamente.</p>
    <h3>Detalles de la suscripción:</h3>
    <ul>
      <li>ID de Preaprobación de MercadoPago: ${preapproval_id}</li>
      <li>ID de Transacción de MercadoPago: ${mercadopago_transaction_id}</li>
      <li>Fecha de Suscripción: ${transaction_date}</li>
      <li>Estado de la Suscripción: ${transaction_status}</li>
      <li>Monto Total: $${total_amount}</li>
      <li>Fecha de Fin de Suscripción: ${endDate}</li>
    </ul>
    <p>Gracias por confiar en nosotros. Si tienes alguna pregunta sobre tu suscripción, no dudes en contactarnos.</p>
  </div>
`;
  const message = {
    from: USER_NODEMAILER,
    to: userData.email,
    subject: 'Comprobante de orden de compra',
    html: htmlContent,
  };

  const info = await transporter.sendMail(message);
  return info;
};

module.exports = sendSuccessfulSubscription;
