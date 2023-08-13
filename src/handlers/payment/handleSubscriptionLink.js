const createSubscriptionLink = require('../../controllers/payment/createSubscriptionLink');

const handleSubscriptionLink = async (req, res) => {
  const { sessionid: sessionId, userid: userId } = req.headers;
  try {
    const link = await createSubscriptionLink(userId);
    if (link)
      return res
        .status(200)
        .json({ msg: 'Link creado correctamente', link: link });
    else
      return res.status(400).json({ error: true, msg: 'Error al crear link' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleSubscriptionLink;
