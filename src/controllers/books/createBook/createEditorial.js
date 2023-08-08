const { Editorial } = require('../../../models');
const { v4: uuidv4 } = require('uuid');

const createEditorial = async (bookInfo, transaction) => {
  const [editorialInstance] = await Editorial.findOrCreate({
    where: { id: bookInfo.editorial_id || uuidv4() },
    defaults: { id: uuidv4(), name: bookInfo.editorial_name },
    transaction,
  });
  return editorialInstance;
};

module.exports = createEditorial;
