const {deleteBookFromShelf} = require('../../controllers')

const handleDeleteBookFromShelf = async (req, res) => {
    try {
      
        const bookId = req.query.bookId;
        const book_shelf_category_id = req.query.book_shelf_category_id;
        
     const deletedBook = await deleteBookFromShelf(bookId, book_shelf_category_id);

        if(deletedBook === 1){
            return res.status(200).send('Libro eliminado exitosamente');
        } else {
            return res.status(404).json('El libro seleccionado no se encuentra en el estante seleccionado');
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = handleDeleteBookFromShelf;