const { markBookAsRecommended } = require('../../controllers');

const handleMarkBookAsRecommended = async (req, res) => {
  const { booksId } = req.body;

  if (booksId.length > 10) {
    return res.status(400).json({
      error: true,
      msg: 'No se pueden seleccionar más de 10 libros',
    });
  }

  try {
    const result = await markBookAsRecommended(booksId);

    return res.status(200).json({
      msg: 'Recomendación actualizada exitosamente',
      book: result,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleMarkBookAsRecommended;
