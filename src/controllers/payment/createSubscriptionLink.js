const mercadopago = require('../../config/mercadopago');
const Models = require('../../models');
const moment = require('moment');
const { BACK_URL } = require('../../utils/env');

const createSubscriptionLink = async (userId, price) => {
  const startDate = moment().toISOString();
  const endDate = moment().add(30, 'days').toISOString();

  const formattedStartDate = moment(startDate).format(
    'YYYY-MM-DDTHH:mm:ss.SSSZ'
  );

  const formattedEndDate = moment(endDate).format('YYYY-MM-DDTHH:mm:ss.SSSZ');

  const returnUrl = `https://bf3f-2803-9800-988c-7bb1-5588-ff48-da4f-be2d.ngrok-free.app/api/payment/successfulSubscription?userId=${userId}&endDate=${formattedEndDate}&transactionAmount=${price}`;

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
      transaction_amount: price,
      currency_id: 'ARS',
    },
  };

  try {
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
