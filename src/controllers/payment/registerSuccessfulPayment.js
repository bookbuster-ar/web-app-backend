const Models = require('../../models');
const moment = require('moment');

const registerSuccessfulPayment = async (paymentData) => {
  const date = moment().format('YYYY-MM-DD');
  try {
    const { payment_id, status, payment_type, external_reference } =
      paymentData;
    console.log(external_reference);
    const bookIds = JSON.parse(external_reference);
    console.log(bookIds);

    let totalAmount = 0;
    for (const book of bookIds) {
      totalAmount += book.quantity * book.unit_price;
    }

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
      payment_method_id: paymentMethod.id,
      total_amount: totalAmount,
    });

    const transactionId = newTransaction.id;

    for (const bookId of bookIds) {
      await Models.SaleStock.decrement(
        { stock: bookId.quantity },
        { where: { published_book_id: bookId.id } }
      );

      await Models.TransactionDetail.create({
        quantity: bookId.quantity,
        unit_price: bookId.unit_price,
        total_price: bookId.quantity * bookId.unit_price,
        published_book_id: bookId.id,
        transaction_id: transactionId,
      });
    }

    return { success: true, message: 'Pago registrado con éxito' };
  } catch (error) {
    console.error('Error al registrar el pago:', error);
    return { success: false, error: 'Error al registrar el pago' };
  }
};

module.exports = registerSuccessfulPayment;
