const Models = require('../../models');
const moment = require('moment');
const sequelize = require('../../config/database');

const registerSuccessfulPayment = async (paymentData) => {
  const date = moment().format('YYYY-MM-DD');
  const transaction = await sequelize.transaction();
  try {
    const { payment_id, status, payment_type, external_reference } =
      paymentData;

    const bookIds = JSON.parse(external_reference);

    let totalAmount = 0;
    for (const book of bookIds) {
      totalAmount += book.quantity * book.unit_price;
    }

    let paymentMethod = await Models.PaymentMethod.findOne(
      {
        where: { name: payment_type },
      },
      { transaction }
    );
    if (!paymentMethod) {
      paymentMethod = await Models.PaymentMethod.create(
        { name: payment_type },
        { transaction }
      );
    }

    const newTransaction = await Models.Transaction.create(
      {
        mercadopago_transaction_id: payment_id,
        transaction_date: date,
        transaction_status: status,
        payment_method_id: paymentMethod.id,
        total_amount: totalAmount,
      },
      { transaction }
    );

    const transactionId = newTransaction.id;

    for (const bookId of bookIds) {
      await Models.SaleStock.decrement(
        { stock: bookId.quantity },
        { where: { published_book_id: bookId.id } },
        { transaction }
      );

      await Models.TransactionDetail.create(
        {
          quantity: bookId.quantity,
          unit_price: bookId.unit_price,
          total_price: bookId.quantity * bookId.unit_price,
          published_book_id: bookId.id,
          transaction_id: transactionId,
        },
        { transaction }
      );
    }
    await transaction.commit();
    return { success: true, message: 'Pago registrado con éxito' };
  } catch (error) {
    console.error('Error al registrar el pago:', error);
    await transaction.rollback();
    return { success: false, error: 'Error al registrar  el pago' };
  }
};

module.exports = registerSuccessfulPayment;
