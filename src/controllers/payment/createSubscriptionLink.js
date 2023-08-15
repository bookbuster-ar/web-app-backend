const mercadopago = require('../../config/mercadopago');
const Models = require('../../models');
const moment = require('moment');
const { BACK_URL } = require('../../utils/env');

const createSubscriptionLink = async (userId) => {
  const startDate = moment().toISOString();
  const endDate = moment().add(30, 'days').toISOString();

  const formattedStartDate = moment(startDate).format(
    'YYYY-MM-DDTHH:mm:ss.SSSZ'
  );

  const formattedEndDate = moment(endDate).format('YYYY-MM-DDTHH:mm:ss.SSSZ');

  const transactionAmount = 2000;

  const returnUrl = `https://0e8b-2803-9800-988c-7bb1-db-5a2b-1cb9-e31.ngrok-free.app/api/payment/successfulSubscription?userId=${userId}&endDate=${formattedEndDate}&transactionAmount=${transactionAmount}`;

  const user = await Models.User.findOne({
    where: { id: userId },
  });

  const preference = {
    payer_email: user.email,
    reason: 'Pago de suscripción',
    external_reference: '',
    back_url: returnUrl,
    auto_recurring: {
      frequency: 1,
      frequency_type: 'months',
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      transaction_amount: transactionAmount,
      currency_id: 'ARS',
    },
  };

  try {
    user.subscription = true;
    const mp = await mercadopago.preapproval.create(preference);
    const linkCheckout = mp && mp.response && mp.response.init_point;
    const subscriptionData = {
      linkCheckout,
    };

    return subscriptionData;
  } catch (error) {
    return false;
  }
};

module.exports = createSubscriptionLink;
