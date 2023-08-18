const { getLatestBooksReleases } = require('../../../controllers');
const handleGetLatestBooksReleases = async (req, res) => {
  try {
    const latestBooksReleases = await getLatestBooksReleases();
    return res.status(200).json(latestBooksReleases);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetLatestBooksReleases;
