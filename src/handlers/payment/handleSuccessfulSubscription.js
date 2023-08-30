const { registerSuccessfulSubscription } = require('../../controllers');
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
  try {
    await registerSuccessfulSubscription(userData, subscriptionData);
    return res.redirect(`https://bookbuster-ar.vercel.app/`);
  } catch (error) {
    return res.status(500).send(result.error);
  }
};

module.exports = handleSuccessfulSubscription;
