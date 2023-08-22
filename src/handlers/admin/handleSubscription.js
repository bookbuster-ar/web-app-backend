const { getSubscriptions } = require('../../controllers');

const handleSubscription = async (req, res) => {
  try {
    const subscriptions = await getSubscriptions();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = handleSubscription;
