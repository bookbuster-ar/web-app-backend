const { createSubgenre } = require('../../controllers');

const handleCreateSubgenre = async (req, res) => {
  const { genreId, subgenreName } = req.body;
  try {
    const newSubgenre = await createSubgenre(genreId, subgenreName);
    res.status(201).json(newSubgenre);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

module.exports = handleCreateSubgenre;
