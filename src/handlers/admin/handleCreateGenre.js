const { createGenre } = require('../../controllers');

const handleCreateGenre = async (req, res) => {
  const { name } = req.body;
  try {
    const createdGenre = await createGenre(name);
    return res.status(201).json(createdGenre);
  } catch (error) {
    return res.status(409).json({ error: error.message });
  }
};

module.exports = handleCreateGenre;
