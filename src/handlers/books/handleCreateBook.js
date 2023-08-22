const { createBook } = require('../../controllers/index');
const { validate: validateUUID } = require('uuid');
const { User } = require('../../models');

const handleCreateBook = async (req, res) => {
  try {
    const bookDataToCreate = {
      ...req.body,
      images: Object.keys(req.files).length > 0 ? req.files : null,
    };

    const { userid: userId } = req.headers;

    const user = await User.findByPk(userId);
    if (!user.subscription) {
      return res
        .status(400)
        .json({ error: 'El usuario no tiene una suscripción' });
    }

    const { id } = await createBook(bookDataToCreate, userId);
    if (id && validateUUID(id)) {
      return res
        .status(201)
        .json({ created: { id }, message: 'El libro fue creado con éxito' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = handleCreateBook;
