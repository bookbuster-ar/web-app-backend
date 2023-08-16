const { deleteQuote } = require('../../controllers');

const handleDeleteQuote = async (req, res) => {
  const { quoteId } = req.params;
  try {
    const hasDeleted = await deleteQuote(quoteId);
    if (hasDeleted) {
      return res.status(204).end();
    }
    return res.status(400).json({ error: 'No se pudo borrar la cita' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleDeleteQuote;
