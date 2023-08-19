const { User } = require('../../models/index');

const getSuscriptions = async () => {
  const users = await User.findAll({
    where: {
      subscription: true,
    },
    attributes: ['name', 'last_name', 'email'],
  });
  if (!users.length) {
    return 'No hay suscripciones registradas';
  }
  return {
    subscriptionCount: users.length,
    users: users.map((user) => ({
      name: user.name,
      last_name: user.last_name,
      email: user.email,
    })),
  };
};

module.exports = getSuscriptions;
