const { Book, PublishedBook } = require('../../models');
const markBookAsRecommended = async (bookIds, genreId) => {
  try {
    const updatedBooks = await Promise.all(
      bookIds.map(async (id) => {
        const recommendBook = await PublishedBook.findByPk(id, {
          include: [
            {
              model: Book,
              as: 'book',
              include: [
                {
                  association: 'genres',
                  where: {
                    id: genreId,
                  },
                },
              ],
            },
          ],
        });
        if (!recommendBook) {
          throw new Error('Book not found');
        }
        recommendBook.book.in_recommendation =
          !recommendBook.book.in_recommendation;
        await recommendBook.book.save();
        return recommendBook;
      })
    );
    return updatedBooks;
  } catch (error) {
    throw error;
  }
};

module.exports = markBookAsRecommended;
