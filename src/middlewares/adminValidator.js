const { User, Role } = require('../models');

const adminValidator = async (req, res, next) => {
  const { userid: userId } = req.headers;
  try {
    const user = await User.findOne({
      where: { id: userId },
      include: {
        model: Role,
        as: 'role',
      },
    });

    if (user && user.role.name === 'admin') {
      next();
    } else {
      return res.status(401).json({
        error: true,
        msg: 'No tienes permisos para acceder a esta ruta',
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = adminValidator;
