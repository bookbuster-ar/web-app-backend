const {
  createEditorial,
  createEditorialCollection,
  createNewBook,
  createDependentBookEntities,
  createBookImages,
} = require('./services');

const { cleanupAfterFailure } = require('./cleanup');
const sequelize = require('@config/database');

const { v4: uuidv4 } = require('uuid');

const createBook = async (bookInfo) => {
  let editorialInstance, collectionInstance;
  bookInfo.id = uuidv4();

  // Transacción 1
  const coreTransaction = await sequelize.transaction();
  try {
    editorialInstance = await createEditorial(bookInfo, coreTransaction);
    collectionInstance = await createEditorialCollection(
      bookInfo,
      editorialInstance,
      coreTransaction
    );
    await createNewBook(
      bookInfo,
      editorialInstance,
      collectionInstance,
      coreTransaction
    );

    await coreTransaction.commit();
  } catch (error) {
    await coreTransaction.rollback();
    throw error;
  }

  // Transacción 2
  const secondaryTransaction = await sequelize.transaction();
  try {
    await createBookImages(bookInfo, secondaryTransaction);
    await createDependentBookEntities(bookInfo, secondaryTransaction);

    await secondaryTransaction.commit();
  } catch (error) {
    console.error(error);
    await secondaryTransaction.rollback();

    // Limpieza
    await cleanupAfterFailure(
      bookInfo.id,
      editorialInstance?.id,
      collectionInstance?.id
    );
    throw error;
  }

  // Retorno
  return { id: bookInfo.id };
};

module.exports = createBook;
