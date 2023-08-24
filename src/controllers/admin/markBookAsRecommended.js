const { Book, PublishedBook } = require('../../models');
const markBookAsRecommended = async (bookIds, genreId) => {
  try {
    const updatedBooks = await Promise.all(
      bookIds.map(async (id) => {
        const book = await PublishedBook.findByPk(id, {
          include: [
            {
              model: Book,
              as: 'book',
            },
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
