const { Op } = require('sequelize');
const { Book, BookFormat, BookDetail, BookGenre, BookFormatInterm, PublishedBook } = require('../../models');

const getRecommendation = async (format, pages, genresArray) => {
  let whereCondition = {};

  // Filtrado por cantidad de páginas
  if (pages) {
    switch (pages) {
      case "0to50pages":
        whereCondition['$detail.pages$'] = { [Op.between]: [0, 50] };
        break;
      case "50to100pages":
        whereCondition['$detail.pages$'] = { [Op.between]: [50, 100] };
        break;
      case "100to200pages":
        whereCondition['$detail.pages$'] = { [Op.between]: [100, 200] };
        break;
      case "Mayora200pages":
        whereCondition['$detail.pages$'] = { [Op.gt]: 200 };
        break;
      default:
        throw new Error("Rango de páginas no válido");
    }
  }

  // Inclusión condicional por formato
  let includeFormat = {};
  if (format) {
    const formatInstance = await BookFormat.findOne({ where: { name: format } });

    if (!formatInstance) {
      throw new Error('Formato no encontrado');
    }

    includeFormat = {
      model: BookFormat,
      as: 'formats',
      where: { id: formatInstance.id }
    };
  }

  // Inclusión condicional por género
  let includeGenres = {};
  if (genresArray && genresArray.length) {
    includeGenres = {
      model: BookGenre,
      as: 'genres',
      where: { name: { [Op.in]: genresArray } },
      //attributes: ['name']
    };
  }

  // Búsqueda final de libros
  const books = await Book.findAll({
    where: whereCondition,
    include: [
      includeFormat,
      includeGenres,
      {
        model: PublishedBook,
        as: 'published_book',
        attributes: ['id']
      },{
        model: BookDetail,
        as: 'detail',
        attributes: ['pages'],
      },{
        model: BookFormatInterm,
        as: 'book_format_interms',
      }
    ]
  });

  const transformedBooks = books.map(book => {
    const [cover, ...extra] = book.book?.images?.map((image) => image.image) || [];
    return {
      id: book.id,
      images: { cover, extra },
      title: book.title,
      author: book.author,
      publication_year: book.publication_year,
      editorial_collection_id: book.editorial_collection_id,
      editorial_id: book.editorial_id,
      formats: book.formats.map(format => ({
        id: format.id,
        name: format.name
      })),
      genres: book.genres.map(genre => ({
        id: genre.id,
        name: genre.name
      })),
      published_book: book.published_book,
      detail: book.detail
    };
  });
  

  return transformedBooks;
}

module.exports = getRecommendation;
