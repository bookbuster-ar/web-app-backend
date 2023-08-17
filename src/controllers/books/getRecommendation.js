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
  nacionality_author
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
        case 'Mayora200pages':
          whereCondition['$detail.pages$'] = { [Op.gt]: 200 };
          break;
          case 'Indistinto':
            whereCondition = {};
        break;
      default:
        throw new Error('Rango de páginas no válido');
    }
  }
  
  let includeFormat = {};
  
  if (format) {
    if (format === 'Indistinto') {
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
  
  if (nacionality_author) {
    switch (nacionality_author) {
      case 'Latinoamericanos':
        whereCondition.nationality_author = 'Latinoamericana';
        break;
      case 'De otras partes del mundo':
        whereCondition.nationality_author = 'Española';
        break;
      case 'Indistinto':
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
    const [cover, ...extra] =
      book.book?.images?.map((image) => image.image) || [];
    return {
      id: book.id,
      images: { cover, extra },
      title: book.title,
      author: book.author,
      nationality_author: book.nationality_author,
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
