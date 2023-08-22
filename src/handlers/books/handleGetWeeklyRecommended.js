const { getWeeklyRecommended } = require('../../controllers');

const handleGetWeeklyRecommended = async (req, res) => {
  try {
    const recommendedBook = await getWeeklyRecommended();
    return res.status(200).json({ recommendedBook });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetWeeklyRecommended;
