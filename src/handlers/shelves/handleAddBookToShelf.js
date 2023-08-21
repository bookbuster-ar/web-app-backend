const { addBookToShelf } = require('../../controllers');

const handleAddBookToShelf = async (req, res) => {
  try {
    const bookId = req.query.bookId;
    const book_shelf_category_id = req.query.book_shelf_category_id;
    

    const books = await addBookToShelf(bookId, book_shelf_category_id);

      if(books) return res.status(200).send('Libro agregado al estante exitosamente');
     
  } catch (error) {
    if(error.message === 'El libro ya se encuentra en el estante seleccionado'){
      return res.status(409).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = handleAddBookToShelf;
