const Models = require('../../models');
const moment = require('moment');

const registerSuccessfulPayment = async (paymentData) => {
  const date = moment().format('YYYY-MM-DD');
  try {
    const { payment_id, status, payment_type } = paymentData;

    let paymentMethod = await Models.PaymentMethod.findOne({
      where: { name: payment_type },
    });
    if (!paymentMethod) {
      paymentMethod = await Models.PaymentMethod.create({ name: payment_type });
    }

    const newTransaction = await Models.Transaction.create({
      mercadopago_transaction_id: payment_id,
      transaction_date: date,
      transaction_status: status,
    });

    return { success: true, message: 'Pago registrado con éxito' };
  } catch (error) {
    console.error('Error al registrar el pago:', error);
    return { success: false, error: 'Error al registrar el pago' };
  }
};

module.exports = registerSuccessfulPayment;
