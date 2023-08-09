const admin = require('@config/firebase-admin');
const { User } = require('@models');

const verifyUserMail = async (firebaseId) => {
  try {
    const userToUpdate = await User.findOne({
      where: { firebase_id: firebaseId },
    });
    if (!userToUpdate) {
      throw new Error('Usuario no encontrado');
    }

    if (userToUpdate.email_verified) {
      throw new Error('El mail del usuario ya fue verificado');
    }

    await userToUpdate.update({ email_verified: true });
    verifyUserMailInFirebase(firebaseId);

    return true;
  } catch (error) {
    throw error;
  }
};

const verifyUserMailInFirebase = async (firebaseId) => {
  await admin.auth().updateUser(firebaseId, { emailVerified: true });
};

module.exports = verifyUserMail;
