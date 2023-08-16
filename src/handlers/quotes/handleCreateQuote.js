const { createQuote } = require('../../controllers');

const handleCreateQuote = async (req, res) => {
  const { userid: userId } = req.headers;
  const { bookId } = req.params;
  const { content } = req.body;
  try {
    const quoteInfo = { bookId, userId, content };
    const createdQuote = await createQuote(quoteInfo);
    if (createdQuote) {
      return res.status(201).json(createdQuote);
    }
    return res.status(400).json({
      error: 'No se pudo crear la cita',
    });
  } catch (error) {
    if (error?.statusCode === 409) {
      return res.status(409).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = handleCreateQuote;
