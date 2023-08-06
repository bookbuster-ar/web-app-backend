const getAllBooks = require('../controllers/books/getAllBooks');
const getFilteredBooks = require('../controllers/books/getFilteredBooks');

const handleGetBooks = async (req, res) => {
  const { title, author } = req.query;
  try {
    if (title || author) {
      const filteredBooks = await getFilteredBooks({ title, author });
      return res.status(200).json(filteredBooks);
    } else {
      const allBooks = await getAllBooks();
      return res.status(200).send(allBooks);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetBooks;
