const {
  Book,
  EditorialCollection,
  Editorial,
  BookGenre,
} = require('../../models/');

const getBooksByGenre = async (id) => {
  try {
    const genreMatched = await BookGenre.findByPk(id, {
      include: [
        {
          model: Book,
          as: 'books',
          include: [
            { model: EditorialCollection, as: 'editorial_collection' },
            { model: Editorial, as: 'editorial' },
          ],
        },
      ],
    });

    return {
      id: genreMatched.id,
      genre: genreMatched.name,
      books: genreMatched.books.map((book) => ({
        id: book.id,
        title: book.title,
        author: book.author,
        publication_year: book.publication_year,
        editorial: book.editorial.name,
        editorial_collection: book.editorial_collection.name,
      })),
    };
  } catch (error) {
    throw error;
  }
};

module.exports = getBooksByGenre;
