const { getMostPopularBooks } = require('../../../controllers');

const handleGetMostPopularBooks = async (req, res) => {
  try {
    const mostPopularBooks = await getMostPopularBooks();
    return res.status(200).json(mostPopularBooks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetMostPopularBooks;
