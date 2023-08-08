const {
  createEditorial,
  createNewBook,
  createBookImages,
} = require('./services');

const { cleanupAfterFailure } = require('./cleanup');
const sequelize = require('@config/database');

const { v4: uuidv4 } = require('uuid');

const createBook = async (bookInfo) => {
  let editorialInstance;
  bookInfo.id = uuidv4();

  // Transacción 1
  const coreTransaction = await sequelize.transaction();
  try {
    editorialInstance = await createEditorial(bookInfo, coreTransaction);
    await createNewBook(bookInfo, editorialInstance, coreTransaction);

    await coreTransaction.commit();
  } catch (error) {
    await coreTransaction.rollback();
    throw error;
  }

  // Transacción 2
  const secondaryTransaction = await sequelize.transaction();
  try {
    await createBookImages(bookInfo, secondaryTransaction);

    await secondaryTransaction.commit();
  } catch (error) {
    console.error(error);
    await secondaryTransaction.rollback();

    // Limpieza
    await cleanupAfterFailure(bookInfo.id, editorialInstance?.id);
    throw error;
  }

  // Retorno
  return { id: bookInfo.id };
};

module.exports = createBook;
