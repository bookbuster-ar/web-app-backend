const { auth } = require('../../config/firebase');
const { signInWithEmailAndPassword } = require('firebase/auth');
const { Session, User } = require('../../models/index');

const loginLocal = async (body) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    body.email,
    body.password
  );
  const token = await userCredential.user.getIdToken();

  const user = await User.findOne({
    where: { email: body.email },
    include: ['image', 'role'],
  });

  const [session, wasCreated] = await Session.findOrCreate({
    where: { session_token: token },
    defaults: { session_status: true, session_token: token, user_id: user.id },
  });

  if (!wasCreated) {
    throw Error('El usuario tiene una sesión activa');
  }

  const { role_id, image_id, ...formatedUser } = user.toJSON();

  return { token, ...formatedUser };
};

module.exports = loginLocal;
