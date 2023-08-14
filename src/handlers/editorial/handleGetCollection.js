const { getCollection } = require('../../controllers/index');

const handleGetCollection = async (req, res) => {
  const { id: editorialId } = req.query;
  try {
    const collection = await getCollection(editorialId);
    res.status(200).json(collection);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = handleGetCollection;
