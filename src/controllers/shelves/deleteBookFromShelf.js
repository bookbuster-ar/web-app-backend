const {BookShelfCategoryInterm} = require('../../models');

const deleteBookFromShelf = async (bookId, book_shelf_category_id) => {
    
    const deletedBook = await BookShelfCategoryInterm.destroy({
        where: {
            book_id: bookId,
            book_shelf_category_id: book_shelf_category_id
        }
    });

    return deletedBook;
}

module.exports = deleteBookFromShelf;