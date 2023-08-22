const {deleteBookFromShelf} = require('../../controllers')

const handleDeleteBookFromShelf = async (req, res) => {
    try {
      
        const bookId = req.query.bookId;
        const book_shelf_category_id = req.query.book_shelf_category_id;
        
     const deletedBook = await deleteBookFromShelf(bookId, book_shelf_category_id);

        if(deletedBook === 1){
            return res.status(200).send('Libro eliminado del estante ');
        } 
    } catch (error) {
        if(error.message === 'El libro no se encuentra en el estante seleccionado'){
            return res.status(409).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
}

module.exports = handleDeleteBookFromShelf;