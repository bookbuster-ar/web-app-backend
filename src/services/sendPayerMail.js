const sendPayerMail = async (
  payerInfo,
  newTransaction,
  userToSubscribe,
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
      <h2 style="color: #333;">Gracias por regalar una suscripción, ${payerInfo.name} ${payerInfo.last_name}!</h2>
      <p>Estamos encantados de informarte que tu regalo de suscripción ha sido procesado exitosamente.</p>
      <h3>Detalles del regalo de suscripción:</h3>
      <ul>
        <li>ID de Preaprobación de MercadoPago: ${preapproval_id}</li>
        <li>ID de Transacción de MercadoPago: ${mercadopago_transaction_id}</li>
        <li>Fecha de Transacción: ${transaction_date}</li>
        <li>Estado de la Transacción: ${transaction_status}</li>
        <li>Monto Total: $${total_amount}</li>
        <li>Nombre del destinatario: ${userToSubscribe.name} ${userToSubscribe.last_name}</li>
        <li>Correo electrónico del destinatario: ${userToSubscribe.email}</li>
        <li>Fecha de Fin de Suscripción: ${endDate}</li>
      </ul>
      <p>Gracias por tu generosidad. Si tienes alguna pregunta sobre el regalo, no dudes en contactarnos.</p>
    </div>
  `;
};

module.exports = sendPayerMail;
