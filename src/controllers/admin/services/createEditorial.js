const { Editorial } = require('../../../models');
const { v4: uuidv4 } = require('uuid');

const createEditorial = async (bookInfo, transaction) => {
  const editorialId = bookInfo.collectionId ?? uuidv4();

  const [editorialInstance] = await Editorial.findOrCreate({
    where: { id: editorialId },
    defaults: { name: bookInfo.editorialName },
    transaction: transaction,
  });
  return editorialInstance;
};

module.exports = createEditorial;
