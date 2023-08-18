const mercadopago = require('../../config/mercadopago');
const Models = require('../../models');
const moment = require('moment');
const { BACK_URL } = require('../../utils/env');

const createSubscriptionLink = async (userId, price) => {
  const argentinaTimezone = 'America/Argentina/Buenos_Aires';
  const startDate = moment().tz(argentinaTimezone);
  const endDate = moment().tz(argentinaTimezone).add(30, 'days');

  const formattedStartDate = moment(startDate).format(
    'YYYY-MM-DDTHH:mm:ss.SSSZ'
  );

  const formattedEndDate = moment(endDate).format('YYYY-MM-DDTHH:mm:ss.SSSZ');

  const returnUrl = `${BACK_URL}/api/payment/successfulSubscription?userId=${userId}&endDate=${formattedEndDate}&transactionAmount=${price}`;

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

  const mp = await mercadopago.preapproval.create(preference);
  const linkCheckout = mp && mp.response && mp.response.init_point;

  const subscriptionData = {
    linkCheckout,
  };
  return subscriptionData;
};

module.exports = createSubscriptionLink;
