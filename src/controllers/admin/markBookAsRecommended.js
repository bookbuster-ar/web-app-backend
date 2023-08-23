const { Book } = require('../../models');
const markBookAsRecommended = async (bookIds, genreId) => {
  try {
    const updatedBooks = await Promise.all(
      bookIds.map(async (id) => {
        const book = await Book.findByPk(id, {
          include: [
            {
              association: 'genres',
              where: {
                id: genreId,
              },
            },
          ],
        });
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
