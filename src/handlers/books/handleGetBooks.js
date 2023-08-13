const { getAllBooks, getFilteredBooks } = require('../../controllers');

const handleGetBooks = async (req, res) => {
  const { title, author, search } = req.query;
  try {
    if (search) {
      const searchResults = await getFilteredBooks(req,{ search });
      return res.status(200).json(searchResults);
    } else if (title || author) {
      const filteredBooks = await getFilteredBooks(req,{ title, author });
      return res.status(200).json(filteredBooks);
    } else {
      const allBooks = await getAllBooks(req);
      return res.status(200).send(allBooks);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetBooks;
