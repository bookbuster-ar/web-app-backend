const verifyUserMail = async (userId) => {
  try {
    const userToUpdate = await User.findOne({ where: { firebase_id: userId } });
    if (!userToUpdate) {
      throw new Error('Usuario no encontrado');
    }
    const [affectedCount] = await userToUpdate.update({ email_verified: true });

    return affectedCount > 0;
  } catch (error) {
    throw error;
  }
};

module.exports = verifyUserMail;
