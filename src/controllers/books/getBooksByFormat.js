const {
  Book,
  BookFormat,
  BookFormatInterm,
  PublishedBook,
} = require('../../models');
const getBooksByFormat = async (format) => {
  const nameFormat = await BookFormat.findOne({ where: { name: format } });

  if (!nameFormat) {
    throw new Error('Formato no encontrado');
  }

  const booksFormatInterm = await BookFormatInterm.findAll({
    where:{book_format_id: nameFormat.id},
    include: [
      {
        model: Book,
        as: 'book',
        include: [ 'images',
        {
            model: PublishedBook,
            as: 'published_book',
          },
        ],
      },
    ],
  });

  const books = booksFormatInterm.map((interm) => {
    const [cover, ...extra] = interm.book?.images.map((image) => image.image);
      return {
        id: interm.id, 
        images: { cover, extra },
        title: interm.book.title,
        author: interm.book.author,
        publication_year: interm.book.publication_year?.name,
        editorial_collection: interm.book.editorial_collection?.name,
        editorial: interm.book.editorial,
    };
});

  return books;

};

module.exports = getBooksByFormat;
