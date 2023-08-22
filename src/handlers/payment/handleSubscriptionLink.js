const { createSubscriptionLink } = require('../../controllers');

const handleSubscriptionLink = async (req, res) => {
  const { sessionid: sessionId, userid: userId } = req.headers;
  const { price } = req.body;
  try {
    const link = await createSubscriptionLink(userId, price);
    if (link)
      return res
        .status(200)
        .json({ msg: 'Link creado correctamente', link: link });
    else
      return res.status(400).json({ error: true, msg: 'Error al crear link' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleSubscriptionLink;
