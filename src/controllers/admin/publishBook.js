const sequelize = require('../../config/database');
const {
  Book,
  BookDetail,
  PublishedBook,
  BookToReview,
  BookFormat,
  PublishedBookPrice,
  User,
} = require('../../models');

const {
  createEditorial,
  createCollection,
  createBookImages,
  sendConfirmationMail,
} = require('./services/index');

const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const updateBook = async (bookInfo, userId = null) => {
  let t;
  try {
    // Fase de preparación
    t = await sequelize.transaction();
    let outdatedBook, outdatedDetail, editorial, collection, bookFormat;

    if (bookInfo.id) {
      [outdatedBook, outdatedDetail, editorial, collection, bookFormat] =
        await Promise.all([
          Book.findByPk(bookInfo.id, { transaction: t }),
          BookDetail.findOne({
            where: { book_id: bookInfo.id },
            transaction: t,
          }),
          createEditorial(bookInfo, t),
          createCollection(bookInfo, t),
          BookFormat.findOne({
            where: { name: { [Op.like]: `%${bookInfo.format}%` } },
            transaction: t,
          }),
        ]);
      await t.commit();
    } else {
      [outdatedBook, editorial, collection, bookFormat] = await Promise.all([
        Book.create({ id: uuidv4() }, { transaction: t }),
        createEditorial(bookInfo, t),
        createCollection(bookInfo, t),
        BookFormat.findOne({
          where: { name: { [Op.like]: `%${bookInfo.format}%` } },
          transaction: t,
        }),
      ]);

      await t.commit();

      outdatedDetail = await BookDetail.create({
        book_id: outdatedBook.id,
      });
    }

    // Fase de actualización
    t = await sequelize.transaction();

    if (bookInfo.images) {
      await createBookImages({ ...bookInfo, id: outdatedBook.id }, t);
    }

    await Promise.all([
      outdatedBook.setEditorial(editorial, { transaction: t }),
      editorial.addEditorialCollection(collection, { transaction: t }),
      outdatedBook.setEditorial_collection(collection, { transaction: t }),
      outdatedBook.addFormat(bookFormat, { transaction: t }),
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
          pages: bookInfo.pages,
          isbn: bookInfo.isbn ?? 'N/A',
          size: bookInfo.size,
          language: bookInfo.language,
        },
        { transaction: t }
      ),
      BookToReview.destroy({ where: { book_id: bookInfo.id }, transaction: t }),
    ]);

    await t.commit();

    // Fase de publicación
    t = await sequelize.transaction();

    const publishedBook = await PublishedBook.create(
      { book_id: bookInfo.id ?? outdatedBook.id },
      { transaction: t }
    );

    await PublishedBookPrice.create(
      {
        price: bookInfo.price,
        book_format_id: bookFormat.id,
        published_book_id: publishedBook.id,
      },
      { transaction: t }
    );

    await t.commit();

    if (userId) {
      const userInfo = await User.findByPk(userId);
      await sendConfirmationMail(userInfo, {
        ...bookInfo,
        publicationId: publishedBook.id,
      });
    }
  } catch (error) {
    if (t) await t.rollback();
    throw error;
  }
};

module.exports = updateBook;
