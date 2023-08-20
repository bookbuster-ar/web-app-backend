const { createGiftSubscriptionLink } = require('../../controllers');

const handleGiftSubscriptionLink = async (req, res) => {
  const { sessionid: sessionId, userid: userId } = req.headers;
  const { price, userEmail, giftDays } = req.body;
  const giftData = { userId, price, userEmail, giftDays };
  try {
    const link = await createGiftSubscriptionLink(giftData);
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

module.exports = handleGiftSubscriptionLink;
