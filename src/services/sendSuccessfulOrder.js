const { USER_NODEMAILER } = require('../utils/env');
const transporter = require('../config/nodemailer');

const sendSuccessfulOrder = async (newTransaction, userData, paymentMethod) => {
  const {
    mercadopago_transaction_id,
    transaction_date,
    transaction_status,
    total_amount,
  } = newTransaction;

  const htmlContent = `
    <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
      <h2 style="color: #333;">Gracias por tu compra, ${userData.name} ${userData.last_name}!</h2>
      <p>Estamos encantados de informarte que tu orden ha sido procesada exitosamente.</p>
      <h3>Detalles del pedido:</h3>
      <ul>
        <li>ID de Transacción de MercadoPago: ${mercadopago_transaction_id}</li>
        <li>Fecha de Transacción: ${transaction_date}</li>
        <li>Estado de la Transacción: ${transaction_status}</li>
        <li>Método de Pago: ${paymentMethod.name}</li>
        <li>Monto Total: $${total_amount}</li>
      </ul>
      <p>Gracias por confiar en nosotros. Si tienes alguna pregunta sobre tu pedido, no dudes en contactarnos.</p>
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

module.exports = sendSuccessfulOrder;
