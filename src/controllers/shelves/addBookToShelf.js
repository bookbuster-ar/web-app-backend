const {BookShelves , BookShelfCategory , BookShelfCategoryInterm } = require('../../models');

const addBookToShelf = async ( bookId , book_shelf_category_id) => {

    const addNewBookAtTheShelf = await BookShelfCategoryInterm.findOrCreate({
        where: {
            book_id: bookId,
            book_shelf_category_id: book_shelf_category_id
        }
    });
    
    return addNewBookAtTheShelf;   
}

module.exports = addBookToShelf;