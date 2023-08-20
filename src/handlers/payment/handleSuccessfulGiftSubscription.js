const { registerSuccessfulGiftSubscription } = require('../../controllers');
const url = require('url');
const querystring = require('querystring');
const handleSuccessfulGiftSubscription = async (req, res) => {
  const referer = req.headers.referer;
  const parsedUrl = url.parse(referer);
  const query = parsedUrl.query;
  const queryParams = querystring.parse(query);
  const { payment_id, status } = queryParams;
  const {
    userId,
    endDate,
    transactionAmount,
    preapproval_id,
    userEmail,
    giftDays,
  } = req.query;

  const userData = { userId };
  const subscriptionData = {
    payment_id,
    status,
    transactionAmount,
    preapproval_id,
    userEmail,
    endDate,
    giftDays,
  };
  console.log(subscriptionData, userData);
  try {
    await registerSuccessfulGiftSubscription(userData, subscriptionData);
    return res.redirect(`https://bookbuster-deploy.vercel.app/`);
  } catch (error) {
    console.error('Error al registrar el pago:', error);
    return res.status(500).send({ error: 'Error al registrar el pago' });
  }
};

module.exports = handleSuccessfulGiftSubscription;
