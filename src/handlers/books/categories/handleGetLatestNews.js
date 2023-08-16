const { getLatestNews } = require('../../../controllers');

const handleGetLatestNews = async (req, res) => {
  try {
    const latestNews = await getLatestNews();
    return res.status(200).json(latestNews);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetLatestNews;
