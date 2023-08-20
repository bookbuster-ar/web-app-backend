const { likeQuote } = require('../../controllers');

const handleLikeQuote = async (req, res) => {
  const { userid: userId } = req.headers;
  const { quoteId } = req.params;

  try {
    const likedQuote = await likeQuote({ quoteId, userId });
    if (likedQuote) {
      return res.status(201).json(likedQuote);
    }
    return res.status(400).json({ error: 'No fue posible likear la cita' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleLikeQuote;
