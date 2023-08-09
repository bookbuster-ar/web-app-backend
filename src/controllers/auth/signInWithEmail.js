const { auth } = require('@config/firebase/client');
const { signInWithEmailAndPassword } = require('firebase/auth');
const { Session, User } = require('@models');

const singInWithEmail = async (body) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    body.email,
    body.password
  );

  const [token, user] = Promise.all([
    userCredential.user.getIdToken(),
    User.findOne({
      where: { email: body.email },
      include: ['image', 'role'],
    }),
  ]);

  const [session, wasCreated] = await Session.findOrCreate({
    where: { session_token: token },
    defaults: { session_status: true, session_token: token, user_id: user.id },
  });

  if (!wasCreated) {
    throw Error('El usuario tiene ya una sesión activa');
  }

  const { role_id, image_id, ...formatedUser } = user.toJSON();
  return { token, user: { ...formatedUser } };
};

module.exports = singInWithEmail;
