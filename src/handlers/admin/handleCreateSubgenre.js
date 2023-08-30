const { createSubgenre } = require('../../controllers');

const handleCreateSubgenre = async (req, res) => {
  const { genreIds, subgenreName } = req.body;
  try {
    const newSubgenre = await createSubgenre(genreIds, subgenreName);
    return res.status(201).json(newSubgenre);
  } catch (error) {
    console.error(error);
    return res.status(409).json({ error: error.message });
  }
};

module.exports = handleCreateSubgenre;
