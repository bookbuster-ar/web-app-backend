// Sequelize
const sequelize = require('@config/database');

// UUID
const { v4: uuidv4 } = require('uuid');

const createEditorial = require('./createEditorial');
const createEditorialCollection = require('./createEditorialCollection');
const createNewBook = require('./createNewBook');
const createDependentBookEntities = require('./createDependentBookEntities');
const createBookImages = require('./createBookImages');

const createBook = async (bookInfo) => {
  const transaction = await sequelize.transaction();
  bookInfo.id = uuidv4();

  try {
    const editorialInstance = await createEditorial(bookInfo, transaction);
    const collectionInstance = await createEditorialCollection(
      bookInfo,
      editorialInstance,
      transaction
    );
    await createNewBook(
      bookInfo,
      editorialInstance,
      collectionInstance,
      transaction
    );
    await createDependentBookEntities(bookInfo, transaction);
    await transaction.commit();
    await createBookImages(bookInfo);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = createBook;
