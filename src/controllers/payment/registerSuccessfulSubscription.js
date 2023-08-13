const { Transaction, User } = require('../../models');
const sendSuccessfulSubscription = require('../../services/sendSuccessfulSubscription');
const moment = require('moment');
const sequelize = require('../../config/database');

const registerSuccessfulSubscription = async (userData, subscriptionData) => {
  const date = moment().format('YYYY-MM-DD');
  const transaction = await sequelize.transaction();
  try {
    const { userId, endDate } = userData;
    const { payment_id, status, transactionAmount, preapproval_id } =
      subscriptionData;
    console.log(preapproval_id);

    const promiseTransaction = Transaction.create(
      {
        mercadopago_transaction_id: parseInt(payment_id),
        transaction_date: date,
        transaction_status: status,
        total_amount: transactionAmount,
        user_id: userId,
      },
      { transaction }
    );

    const promiseUserData = User.findOne({
      where: {
        id: userId,
      },
      attributes: ['name', 'last_name', 'email', 'suscription'],
    });

    const [userInfo, newTransaction] = await Promise.all([
      promiseUserData,
      promiseTransaction,
    ]);

    await transaction.commit();

    sendSuccessfulSubscription(
      newTransaction,
      userInfo,
      endDate,
      preapproval_id
    );

    return { success: true, message: 'Pago registrado con éxito' };
  } catch (error) {
    console.error('Error al registrar el pago:', error);
    await transaction.rollback();
    return { success: false, error: 'Error al registrar  el pago' };
  }
};

module.exports = registerSuccessfulSubscription;
