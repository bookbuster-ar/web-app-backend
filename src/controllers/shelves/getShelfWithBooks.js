const {
  BookShelves,
  BookShelfCategory,
  BookShelfCategoryInterm,
  Book,
  PublishedBook,
} = require('../../models');

const getShelfWithBooks = async (userid) => {
  const shelveAndShelfs = await BookShelves.findOne({
    where: {
      user_id: userid,
    },
    include: [
      {
        model: BookShelfCategory,
        as: 'book_shelf_categories',
        include: [
          {
            model: Book,
            as: 'books',
            include: [
              'images',
              'editorial',
              'editorial_collection',
              {
                model: PublishedBook,
                as: 'published_book',
                attributes: ['id'],
              },
            ],
          },
        ],
      },
    ],
  });

  // Convertimos la instancia Sequelize a un objeto simple
  const plainShelveAndShelfs = shelveAndShelfs.toJSON();

  // Formateamos los libros
  const formattedBookShelfCategories =
    plainShelveAndShelfs.book_shelf_categories.map((category) => {
      const formattedBooks = category.books.map((book) => {
        const coverImage =
          book.images && book.images.length > 0 ? book.images[0].image : null;
        const extraImages =
          book.images && book.images.length > 1
            ? book.images.slice(1).map((img) => img.image)
            : [];

        return {
          id: book.published_book.id,
          images: { cover: coverImage, extra: extraImages },
          title: book.title,
          author: book.author,
          author_nationality: book.author_nationality,
          publication_year: book.publication_year,
          editorial_collection: book.editorial_collection
            ? book.editorial_collection.name
            : '',
          editorial: book.editorial ? book.editorial.name : '',
        };
      });
      return {
        ...category, // Esto tomará todas las propiedades existentes de 'category'
        books: formattedBooks,
      };
    });

  return {
    ...plainShelveAndShelfs,
    book_shelf_categories: formattedBookShelfCategories,
  };
};

module.exports = getShelfWithBooks;
