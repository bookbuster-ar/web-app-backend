const { Op } = require('sequelize');
const {
  Book,
  BookFormat,
  BookDetail,
  BookGenre,
  BookFormatInterm,
  PublishedBook,
} = require('../../models');

const getRecommendation = async (
  format,
  pages,
  genresArray,
  author_nationality
) => {
  let whereCondition = {};

  if (pages) {
    switch (pages) {
      case '0to50pages':
        whereCondition['$detail.pages$'] = { [Op.between]: [0, 50] };
        break;
      case '50to100pages':
        whereCondition['$detail.pages$'] = { [Op.between]: [50, 100] };
        break;
      case '100to200pages':
        whereCondition['$detail.pages$'] = { [Op.between]: [100, 200] };
        break;
      case 'GreaterThan200pages':
        whereCondition['$detail.pages$'] = { [Op.gt]: 200 };
        break;
      case 'Indistinct':
        whereCondition = {};
        break;
      default:
        throw new Error('Rango de páginas no válido');
    }
  }

  let includeFormat = {};

  if (format) {
    if (format === 'Indistinct') {
      includeFormat = {
        model: BookFormat,
        as: 'formats',
      };
    } else {
      const formatInstance = await BookFormat.findOne({
        where: { name: format },
      });

      if (!formatInstance) {
        throw new Error('Formato no encontrado');
      }

      includeFormat = {
        model: BookFormat,
        as: 'formats',
        where: { id: formatInstance.id },
      };
    }
  }

  const countries = {
    latam: [
      'Argentina',
      'Brasil',
      'México',
      'Colombia',
      'Chile',
      'Perú',
      'Venezuela',
      'Ecuador',
      'Guatemala',
      'Cuba',
      'Bolivia',
      'República Dominicana',
      'Honduras',
      'Paraguay',
      'Nicaragua',
      'El Salvador',
      'Costa Rica',
      'Panamá',
      'Uruguay',
      'Jamaica',
      'Trinidad y Tobago',
      'Puerto Rico',
      'Haití',
      'Belice',
      'Barbados',
      'Guyana',
      'Surinam',
      'Bahamas',
      'Antigua y Barbuda',
    ],
    others: [
      'Estados Unidos',
      'Canadá',
      'Reino Unido',
      'Francia',
      'Alemania',
      'Italia',
      'España',
      'China',
      'Japón',
      'India',
      'Australia',
      'Rusia',
      'Corea del Sur',
      'Sudáfrica',
      'Egipto',
      'Nigeria',
      'Arabia Saudita',
      'Emiratos Árabes Unidos',
      'Singapur',
      'Turquía',
    ],
  };

  if (author_nationality) {
    switch (author_nationality) {
      case 'Latinamericans':
        whereCondition.author_nationality = { [Op.in]: countries.latam };
        break;
      case 'Others':
        whereCondition.author_nationality = { [Op.in]: countries.others };
        break;
      case 'Indistinct':
        break;
      default:
        throw new Error('Nacionalidad del autor no válida');
    }
  }

  let includeGenres = {};

  if (genresArray && genresArray.length) {
    includeGenres = {
      model: BookGenre,
      as: 'genres',
      where: { name: { [Op.in]: genresArray } },
      //attributes: ['name']
    };
  }

  const books = await Book.findAll({
    where: whereCondition,
    include: [
      includeFormat,
      includeGenres,
      'images',
      'editorial',
      'editorial_collection',
      {
        model: PublishedBook,
        as: 'published_book',
        attributes: ['id'],
      },
      {
        model: BookDetail,
        as: 'detail',
        attributes: ['pages'],
      },
      {
        model: BookFormatInterm,
        as: 'book_format_interms',
      },
    ],
  });

  const transformedBooks = books.map((book) => {
    const [cover, ...extra] = book.images?.map((image) => image.image) || [];
    return {
      id: book.id,
      images: { cover, extra },
      title: book.title,
      author: book.author,
      author_nationality: book.author_nationality,
      publication_year: book.publication_year,
      editorial_collection_id: book.editorial_collection_id,
      editorial_id: book.editorial_id,
      formats: book.formats.map((format) => ({
        id: format.id,
        name: format.name,
      })),
      genres: book.genres.map((genre) => ({
        id: genre.id,
        name: genre.name,
      })),
      published_book: book.published_book,
      detail: book.detail,
    };
  });

  return transformedBooks;
};

module.exports = getRecommendation;
