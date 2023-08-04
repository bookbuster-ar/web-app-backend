const Models = require('../models/index');

const getBookById = async (id) => {
  console.log('Book ID:', id);
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

  const bookWithGenre = await Models.Book.findOne({
    where: { id: id },
    include: ['genres'],
  });
  const filteredGenres = bookWithGenre.genres.map((genre) => genre.name);

  const bookWithGenres = {
    ...bookDetail.toJSON(),
    genres: filteredGenres,
  };

  return bookWithGenres;
};

module.exports = getBookById;

//{
//   "id": "cf655192-4b1e-40a4-a257-65dc8a65ab5f",
//   "title": "NOVÍSIMOS (Poemas inéditos)",
//   "author": "Juana Bignozzi",
//   "publication_year": 2023,
//   "editorial_collection_id": "7599d1b2-4523-4db8-8cc5-ff1f8868f6a4",
//   "editorial_id": "44c52ff3-7ae6-43a2-8572-a5ee3e615738"
// }
