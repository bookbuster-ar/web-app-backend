const { getShelves } = require('../../controllers');

const handleGetShelves = async (req, res) => {
  try {
    const { userid: userId } = req.headers;

    const shelves = await getShelves(userId);

    return res.status(200).json(shelves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetShelves;
