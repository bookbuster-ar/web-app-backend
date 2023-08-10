const admin = require('@config/firebase/admin');
const { User } = require('@models');

const verifyUserMail = async (userId) => {
  try {
    const user = await User.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    if (user.email_verified) {
      throw new Error('El mail del usuario ya fue verificado');
    }

    await user.update({ email_verified: true });
    verifyUserMailInFirebase(user.firebase_id);

    const userUpdated = await User.findByPk(userId, {
      include: ['image', 'role'],
    });

    const { role_id, image_id, firebase_id, ...userWithoutRoleId } =
      userUpdated.toJSON();

    return {
      ...userWithoutRoleId,
    };
  } catch (error) {
    throw error;
  }
};

const verifyUserMailInFirebase = async (firebaseId) => {
  await admin.auth().updateUser(firebaseId, { emailVerified: true });
};

module.exports = verifyUserMail;
