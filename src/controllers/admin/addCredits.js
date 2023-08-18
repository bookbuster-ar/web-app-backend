const { User } = require('../../models');

const addCredits = async (userId, credits) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('Usuario no encontrado');
    user.credit += credits;
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = addCredits;
