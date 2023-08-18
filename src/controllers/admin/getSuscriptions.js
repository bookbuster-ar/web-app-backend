const { User } = require('../../models/index');

const getSuscriptions = async () => {
  const users = await User.findAll();
  const userSuscription = users.filter((user) => user.subscription);
  if (!userSuscription.length) {
    return 'No hay subscripciones registradas';
  }
  return { subscriptionCount: userSuscription.length };
};

module.exports = getSuscriptions;
