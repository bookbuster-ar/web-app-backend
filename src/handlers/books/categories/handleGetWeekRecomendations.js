const { getWeekRecommendations } = require('../../../controllers');

const handleGetWeekRecommendations = async (req, res) => {
  try {
    const weekRecommendations = await getWeekRecommendations();
    return res.status(200).json(weekRecommendations);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetWeekRecommendations;
