const { getUserBooks } = require('../../controllers');

const handleGetUserBooks = async (req, res) => {
  const { userid: userId } = req.headers;
  try {
    const books = await getUserBooks(userId);
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetUserBooks;
