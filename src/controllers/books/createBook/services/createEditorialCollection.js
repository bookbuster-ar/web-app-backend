const { EditorialCollection } = require('@models');
const { v4: uuidv4 } = require('uuid');

const createEditorialCollection = async (
  bookInfo,
  editorialInstance,
  transaction
) => {
  const [collectionInstance] = await EditorialCollection.findOrCreate({
    where: { id: bookInfo.editorial_collection_id || uuidv4() },
    defaults: {
      id: uuidv4(),
      editorial_id: editorialInstance.id,
      name: bookInfo.editorial_collection_name,
    },
    transaction,
  });
  return collectionInstance;
};

module.exports = createEditorialCollection;
