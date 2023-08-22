const { User, Role } = require('../models');
const { validate } = require('uuid');

const adminValidator = async (req, res, next) => {
  const { sessionid: sessionId, userid: userId } = req.headers;

  if (!sessionId || !userId) {
    const missing = !sessionId ? 'ID de la sesión' : 'ID del usuario';
    return res
      .status(400)
      .json({ error: `El ${missing} no puede estar vacío` });
  }

  if (!validate(sessionId) || !validate(userId)) {
    const missing = !validate(sessionId) ? 'ID de la sesión' : 'ID del usuario';
    return res
      .status(400)
      .json({ error: `El ${missing} no es un UUID válido` });
  }

  try {
    const user = await User.findOne({
      where: { id: userId },
      include: {
        model: Role,
        as: 'role',
      },
    });

    if (user && user.role.name?.toLowerCase() === 'admin') {
      next();
    } else {
      return res.status(401).json({
        error: 'No tienes permisos para acceder a esta ruta',
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = adminValidator;
