const { deleteShelf } = require('../../controllers');

const handleDeleteShelf = async (req, res) => {
  try {
    const shelfId = req.query.shelfId;
    const deletedShelf = await deleteShelf(shelfId);
    if (deletedShelf === 1) {
      return res.status(200).send('Estantería eliminada');
    }
  } catch (error) {
    if (error.message === 'El estante ya fue eliminado') {
      return res.status(409).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = handleDeleteShelf;
