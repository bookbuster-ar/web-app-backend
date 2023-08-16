const { getNewcommers } = require('../../../controllers');
const handleGetNewcommers = async (req, res) => {
  try {
    const newcommers = await getNewcommers();
    return res.status(200).json(newcommers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetNewcommers;
