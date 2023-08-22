const {
    BookShelves,
    BookShelfCategory,
    BookShelfCategoryInterm,
    PublishedBook,
    Book,
  } = require('../../models');
  const { Op } = require('sequelize');
  
  const addBookToShelf = async (bookId, book_shelf_category_id) => {
    
  
    const publishedBook = await PublishedBook.findByPk(bookId);
    const book = await Book.findByPk(publishedBook.book_id);
  
    
  
    const addNewBookAtTheShelf = await BookShelfCategoryInterm.findOrCreate({
      where: {
        book_id: book.id,
        book_shelf_category_id: book_shelf_category_id,
      },
    });
  
    
  
    if (addNewBookAtTheShelf[1] === false) {
      throw new Error('El libro ya se encuentra en el estante seleccionado');
    } else if (addNewBookAtTheShelf[1] === true) {
      return addBookToShelf;
    }
  };
  
  module.exports = addBookToShelf;