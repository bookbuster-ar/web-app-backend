const { Book, Editorial, EditorialCollection } = require('@models');

const cleanupAfterFailure = async (bookId, editorialId) => {
  try {
    await Book.destroy({ where: { id: bookId } });
    if (editorialId) {
      await Editorial.destroy({ where: { id: editorialId } });
    }
  } catch (error) {
    console.error('Error durante la limpieza:', error);
    throw new Error(
      'Hubo un error y la limpieza automática no se pudo completar'
    );
  }
};

module.exports = { cleanupAfterFailure };
