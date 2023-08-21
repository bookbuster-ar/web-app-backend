const { EditorialCollection } = require('../../../models');
const { v4: uuidv4 } = require('uuid');

const createCollection = async (bookInfo, transaction) => {
  const collectionId = bookInfo.collectionId ?? uuidv4();

  const [collectionlInstance] = await EditorialCollection.findOrCreate({
    where: { id: collectionId },
    defaults: { name: bookInfo.collectionName },
    transaction: transaction,
  });
  return collectionlInstance;
};

module.exports = createCollection;
