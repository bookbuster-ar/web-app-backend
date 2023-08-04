const Models = require('../models/index');

const getBookById = async (id) => {
  const bookDetail = await Models.BookDetail.findOne({
    where: { book_id: id },
    include: [
      {
        model: Models.Book,
        as: 'book',
        attributes: ['title', 'author', 'publication_year'],
        include: [
          {
            model: Models.Editorial,
            as: 'editorial',
            attributes: ['name'],
          },
          {
            model: Models.EditorialCollection,
            as: 'editorial_collection',
            attributes: ['name'],
          },
        ],
      },
    ],
  });

  const formatedBookDetail = {
    id: bookDetail.id,
    title: bookDetail.book?.title,
    author: bookDetail.book?.author,
    publication_year: bookDetail.book?.publication_year,
    editorial: bookDetail.book?.editorial.name,
    editorial_collection: bookDetail.book?.editorial_collection.name,
    synopsis: bookDetail.synopsis,
    pages: bookDetail.pages,
    isbn: bookDetail.isbn,
    language: bookDetail.language,
    size: bookDetail.size,
    price: bookDetail.price,
    subgenre: bookDetail.subgenre,
  };

  const bookWithGenre = await Models.Book.findOne({
    where: { id: id },
    include: ['genres'],
  });
  const filteredGenres = bookWithGenre.genres.map((genre) => genre.name);

  const bookWithGenres = {
    ...formatedBookDetail,
    genres: filteredGenres,
  };

  return bookWithGenres;
};

module.exports = getBookById;
