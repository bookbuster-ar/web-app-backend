const sequelize = require('../../config/database');
const {
  Book,
  BookDetail,
  PublishedBook,
  BookToReview,
} = require('../../models');

const {
  createEditorial,
  createCollection,
  createBookImages,
} = require('./services');

const publishBook = async (bookInfo) => {
  let t;

  try {
    // Fase de preparación
    t = await sequelize.transaction();

    const [outdatedBook, outdatedDetail, editorial, collection] =
      await Promise.all([
        Book.findByPk(bookInfo.id, { transaction: t }),
        BookDetail.findOne({ where: { book_id: bookInfo.id }, transaction: t }),
        createEditorial(bookInfo, t),
        createCollection(bookInfo, t),
      ]);

    await t.commit();

    // Fase de actualización
    t = await sequelize.transaction();

    if (bookInfo.images) {
      await createBookImages(bookInfo, t);
    }

    await Promise.all([
      outdatedBook.setEditorial(editorial, { transaction: t }),
      editorial.addEditorialCollection(collection, { transaction: t }),
      outdatedBook.setEditorial_collection(collection, { transaction: t }),
      outdatedBook.update(
        {
          title: bookInfo.title,
          author: bookInfo.author,
          author_nationality: bookInfo.authorNationality,
          publication_year: bookInfo.publicationYear,
        },
        { transaction: t }
      ),
      outdatedDetail.update(
        {
          synopsis: bookInfo.synopsis,
          price: bookInfo.price,
          pages: bookInfo.pages,
          isbn: bookInfo.isbn ?? 'N/A',
          size: bookInfo.size,
          language: bookInfo.language,
        },
        { transaction: t }
      ),
      PublishedBook.create({ book_id: bookInfo.id }, { transaction: t }),
      BookToReview.destroy({ where: { book_id: bookInfo.id }, transaction: t }),
    ]);

    await t.commit();
  } catch (error) {
    if (t) await t.rollback();
    throw error;
  }
};

module.exports = publishBook;
