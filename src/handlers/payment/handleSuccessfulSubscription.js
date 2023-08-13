const registerSuccessfulSubscription = require('../../controllers/payment/registerSuccessfulSubscription');
const url = require('url');
const querystring = require('querystring');

const handleSuccessfulSubscription = async (req, res) => {
  console.log(req.headers);
  const referer = req.headers.referer;
  const parsedUrl = url.parse(referer);
  const query = parsedUrl.query;
  const queryParams = querystring.parse(query);
  const { payment_id, status } = queryParams;
  const { userId, endDate, transactionAmount, preapproval_id } = req.query;

  const userData = { userId, endDate };
  console.log(userData);
  const subscriptionData = {
    payment_id,
    status,
    transactionAmount,
    preapproval_id,
  };
  console.log(subscriptionData);

  await registerSuccessfulSubscription(userData, subscriptionData);
  try {
    res.send('Datos recibidos con éxito');
  } catch (error) {
    res.status(500).send(result.error);
  }
};

module.exports = handleSuccessfulSubscription;
