const { addBookToShelf } = require('../../controllers');

const handleAddBookToShelf = async (req, res) => {
  try {
    const bookId = req.query.bookId;
    const book_shelf_category_id = req.query.book_shelf_category_id;

    const books = await addBookToShelf(bookId, book_shelf_category_id);

    if (books[1] === true) {
      return res.status(201).send('Libro agregado al estante exitosamente');
    } else {
      return res
        .status(409)
        .json('El libro ya se encuentra en el estante seleccionado');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = handleAddBookToShelf;
