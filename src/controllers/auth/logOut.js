const { Session } = require('@models');

const logOut = async (sessionId) => {
  const activeSession = await Session.findByPk(sessionId);

  if (!activeSession) {
    throw Error('No hay una sesión activa');
  }

  activeSession.last_connection = new Date();
  activeSession.session_duration = Math.floor(
    (new Date() - new Date(activeSession.starting_date)) / (1000 * 60)
  ); // Session duration (min)

  activeSession.session_status = false;

  return await activeSession.save();
};

module.exports = logOut;
