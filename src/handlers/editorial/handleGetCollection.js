const { getCollection } = require('../../controllers/index');

const handleGetCollection = async (req, res) => {
  const { id: editorialId } = req.query;
  try {
    const collection = await getCollection(editorialId);
    return res.status(200).json(collection);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error: error.message });
  }
};

module.exports = handleGetCollection;
