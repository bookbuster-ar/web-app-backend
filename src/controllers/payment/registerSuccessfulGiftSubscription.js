const { Transaction, User } = require('../../models');
const sendGiftSubscription = require('../../services/sendGiftSubscription');
const sendPayerMail = require('../../services/sendPayerMail');
const moment = require('moment');
const cron = require('node-cron');
const sequelize = require('../../config/database');

const registerSuccessfulGiftSubscription = async (
  userData,
  subscriptionData
) => {
  const date = moment().format('YYYY-MM-DD');
  const transaction = await sequelize.transaction();
  try {
    const { userId } = userData;
    const {
      payment_id,
      status,
      transactionAmount,
      preapproval_id,
      userEmail,
      endDate,
      giftDays,
    } = subscriptionData;

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

    const [payerInfo, newTransaction] = await Promise.all([
      promiseUserData,
      promiseTransaction,
    ]);

    const userToSubscribe = await User.findOne({
      where: {
        email: userEmail,
      },
    });
    await userToSubscribe.update(
      {
        subscription: true,
      },
      { transaction }
    );
    await transaction.commit();
    sendPayerMail(
      payerInfo,
      newTransaction,
      userToSubscribe,
      endDate,
      preapproval_id
    );
    sendGiftSubscription(userToSubscribe, endDate, payerInfo);

    const giftMonths = Math.floor(giftDays / 30);

    cron.schedule(`0 0 * * */${giftMonths} *`, async () => {
      try {
        await userToSubscribe.update({ subscription: false });
        console.log(
          `Suscripción actualizada a falso después de ${giftDays} días.`
        );
      } catch (error) {
        console.error('Error al actualizar el usuario:', error);
      }
    });
    return { success: true, message: 'Suscripción registrada correctamente.' };
  } catch (error) {
    console.error('Error al registrar el pago:', error);
    await transaction.rollback();
    return { success: false, error: 'Error al registrar  el pago' };
  }
};

module.exports = registerSuccessfulGiftSubscription;
