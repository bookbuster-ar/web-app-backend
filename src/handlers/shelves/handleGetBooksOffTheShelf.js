const { getBooksOffTheShelf } = require('../../controllers');

const handleGetBooksOffTheShelf = async (req, res) => {
  try {
    const book_shelf_category_id = req.query.book_shelf_category_id;

    const books = await getBooksOffTheShelf(book_shelf_category_id);

    res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetBooksOffTheShelf;
