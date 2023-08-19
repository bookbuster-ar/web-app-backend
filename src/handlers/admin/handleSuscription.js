const { getSuscriptions } = require('../../controllers');

const handleSuscription = async (req, res) => {
  try {
    const subscriptions = await getSuscriptions();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = handleSuscription;
