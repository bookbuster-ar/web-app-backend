const { Editorial } = require('../../../../models/index');
const { v4: uuidv4 } = require('uuid');

const createEditorial = async (bookInfo, transaction) => {
  const [editorialInstance] = await Editorial.findOrCreate({
    where: { id: bookInfo.editorialId || uuidv4() },
    defaults: { id: uuidv4(), name: bookInfo.editorialName },
    transaction,
  });
  return editorialInstance;
};

module.exports = createEditorial;
