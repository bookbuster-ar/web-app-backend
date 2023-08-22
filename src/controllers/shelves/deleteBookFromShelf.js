const {
    BookShelfCategoryInterm,
    BookShelfCategory,
    Book,
    PublishedBook,
  } = require('../../models');
  
  const deleteBookFromShelf = async (bookId, book_shelf_category_id) => {
    
  
    const publishedBook = await PublishedBook.findByPk(bookId);
    const book = await Book.findByPk(publishedBook.book_id);
  
    const deletedBook = await BookShelfCategoryInterm.destroy({
      where: {
        book_id: book.id,
        book_shelf_category_id: book_shelf_category_id,
      },
    });
  
    if (deletedBook === 0 ) {
      throw new Error('El libro no se encuentra en el estante seleccionado');
    } else if (deletedBook === 1 ) {
      return 1;
    }
  };
  
  module.exports = deleteBookFromShelf;