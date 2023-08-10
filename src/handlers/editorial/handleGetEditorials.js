const { getEditorials } = require('../../controllers');

const handleGetEditorials = async (req, res) => {
  try {
    const editorials = await getEditorials();
    res.status(200).json(editorials);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = handleGetEditorials;
