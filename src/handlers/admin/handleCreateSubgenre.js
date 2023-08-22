const { createSubgenre } = require('../../controllers');

const handleCreateSubgenre = async (req, res) => {
  const { genreId, subgenreName } = req.body;
  try {
    const newSubgenre = await createSubgenre(genreId, subgenreName);
    return res.status(201).json(newSubgenre);
  } catch (error) {
    console.error(error);
    return res.status(409).json({ error: error.message });
  }
};

module.exports = handleCreateSubgenre;
