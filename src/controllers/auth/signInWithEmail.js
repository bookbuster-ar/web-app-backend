const { auth } = require('@config/firebase/client');
const { signInWithEmailAndPassword } = require('firebase/auth');
const { Session, User } = require('@models');

const singInWithEmail = async ({ email, password }) => {
  const user = await User.findOne({
    where: { email: email },
    include: ['image', 'role'],
  });

  if (!user) {
    throw new Error('El usuario no está registrado');
  }
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  const [token, activeUser] = await Promise.all([
    userCredential.user.getIdToken(),
    User.findOne({
      where: { email: email },
      include: ['image', 'role'],
    }),
  ]);

  const [session, wasCreated] = await Session.findOrCreate({
    where: { user_id: activeUser.id, session_status: true },
    defaults: {
      session_status: true,
      user_id: activeUser.id,
    },
  });

  if (!wasCreated) {
    throw Error('El usuario tiene ya una sesión activa');
  }

  const { role_id, image_id, firebase_id, ...formatedUser } =
    activeUser.toJSON();
  return { session_id: session.id, user: { ...formatedUser } };
};

module.exports = singInWithEmail;
