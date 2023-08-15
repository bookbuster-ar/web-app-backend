const registerSuccessfulSubscription = require('../../controllers/payment/registerSuccessfulSubscription');
const url = require('url');
const querystring = require('querystring');

const handleSuccessfulSubscription = async (req, res) => {
  const referer = req.headers.referer;
  const parsedUrl = url.parse(referer);
  const query = parsedUrl.query;
  const queryParams = querystring.parse(query);
  const { payment_id, status } = queryParams;
  const { userId, endDate, transactionAmount, preapproval_id } = req.query;

  const userData = { userId, endDate };
  const subscriptionData = {
    payment_id,
    status,
    transactionAmount,
    preapproval_id,
  };
  await registerSuccessfulSubscription(userData, subscriptionData);
  try {
    res.redirect(
      `https://bookbuster-deploy.vercel.app/?data=${encodeURIComponent(
        JSON.stringify({ userData, subscriptionData })
      )}`
    );
  } catch (error) {
    res.status(500).send(result.error);
  }
};

module.exports = handleSuccessfulSubscription;
