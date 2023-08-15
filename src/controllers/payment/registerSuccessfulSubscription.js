const { Transaction, User } = require('../../models');
const sendSuccessfulSubscription = require('../../services/sendSuccessfulSubscription');
const moment = require('moment');
const cron = require('node-cron');
const sequelize = require('../../config/database');

const registerSuccessfulSubscription = async (userData, subscriptionData) => {
  const date = moment().format('YYYY-MM-DD');
  const transaction = await sequelize.transaction();
  try {
    const { userId, endDate } = userData;
    const { payment_id, status, transactionAmount, preapproval_id } =
      subscriptionData;

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
      attributes: ['name', 'last_name', 'email', 'subscription'],
    });

    const [userInfo, newTransaction] = await Promise.all([
      promiseUserData,
      promiseTransaction,
    ]);

    await User.update(
      { subscription: true },
      {
        where: {
          id: userId,
        },
        transaction,
      }
    );

    await transaction.commit();

    sendSuccessfulSubscription(
      newTransaction,
      userInfo,
      endDate,
      preapproval_id
    );

    cron.schedule(`0 0 */30 * *`, async () => {
      try {
        await User.update(
          { subscription: false },
          {
            where: {
              id: userId,
            },
          }
        );
        console.log('Suscripción actualizada a falso después de 30 días.');
      } catch (error) {
        console.error('Error al actualizar la suscripción:', error);
      }
    });

    return { success: true, message: 'Pago registrado con éxito' };
  } catch (error) {
    console.error('Error al registrar el pago:', error);
    await transaction.rollback();
    return { success: false, error: 'Error al registrar  el pago' };
  }
};

module.exports = registerSuccessfulSubscription;
