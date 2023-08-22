const { getEditorials } = require('../../controllers/index');

const handleGetEditorials = async (req, res) => {
  try {
    const editorials = await getEditorials();
    return res.status(200).json(editorials);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error: error.message });
  }
};

module.exports = handleGetEditorials;
