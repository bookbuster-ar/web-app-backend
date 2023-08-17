const { Book } = require('../../models');
const markBookAsRecommended = async (bookIds) => {
  try {
    const updatedBooks = await Promise.all(
      bookIds.map(async (id) => {
        const book = await Book.findByPk(id);
        if (!book) {
          throw new Error('Book not found');
        }
        book.in_recommendation = !book.in_recommendation;
        await book.save();
        return book;
      })
    );
    return updatedBooks;
  } catch (error) {
    throw error;
  }
};

module.exports = markBookAsRecommended;
