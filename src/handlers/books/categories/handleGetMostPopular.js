const { getMostPopular } = require('../../../controllers');

const handleGetMostPopular = async (req, res) => {
  try {
    const mostPopularBooks = await getMostPopular();
    return res.status(200).json(mostPopularBooks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetMostPopular;
