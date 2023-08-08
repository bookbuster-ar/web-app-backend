const { firebase } = require('@config/firebase');
const { User } = require('@models');

const registerUserWithEmail = async (userInfo) => {
  const { name, lastname, email, password } = userInfo;

  try {
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const firebaseUser = userCredential.user;

    const user = await User.create({
      id: firebaseUser?.uid,
      name,
      last_name: lastname,
      email,
    });

    await firebaseUser.sendEmailVerification();

    return user.toJSON();
  } catch (error) {
    throw error;
  }
};

const isUserRegistered = async (email) => {
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    return !!userRecord;
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      return false;
    }
    throw error;
  }
};

module.exports = registerUserWithEmail;
