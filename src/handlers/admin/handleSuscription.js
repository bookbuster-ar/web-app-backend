const { getSuscriptions } = require('../../controllers');

const handleSuscription = async (req, res) => {
  try {
    const subscriptions = await getSuscriptions();
    return res.status(200).json(subscriptions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleSuscription;
