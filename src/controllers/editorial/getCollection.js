const { EditorialCollection } = require('../../models/index');

const getCollection = async (editorialId) => {
  const collection = await EditorialCollection.findAll({
    where: {
      editorial_id: editorialId,
    },
  });
  return collection?.map(({ id, name }) => ({ id, name }));
};

module.exports = getCollection;
