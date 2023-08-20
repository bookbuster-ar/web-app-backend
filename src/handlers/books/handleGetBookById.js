const { getBookById } = require('../../controllers/index');

const handleGetBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const bookDetail = await getBookById(id);
    if (!bookDetail)
      return res.status(404).json({ message: 'Libro no encontrado' });

    return res.status(200).json(bookDetail);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message:
        'Error al recuperar la información del libro: no se encontró el libro con el ID proporcionado',
    });
  }
};

module.exports = handleGetBookById;
