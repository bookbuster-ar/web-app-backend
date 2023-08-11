const { Session } = require('../models');
const { validate } = require('uuid');
const verifySession = async (req, res, next) => {
  const { sessionId, bookId, userId } = req.headers;

  if (!sessionId || !bookId || !userId) {
    const missing = !sessionId
      ? 'ID de la sesión'
      : !bookId
      ? 'ID del libro'
      : 'ID del usuario';
    return res
      .status(400)
      .json({ error: `El ${missing} no puede estar vacío` });
  }

  if (!validate(sessionId) || !validate(bookId) || !validate(userId)) {
    const missing = !validate(sessionId)
      ? 'ID de la sesión'
      : !validate(bookId)
      ? 'ID del libro'
      : 'ID del usuario';
    return res
      .status(400)
      .json({ error: `El ${missing} no es un UUID válido` });
  }

  const activeSession = await Session.findOne({
    where: { id: sessionId, session_status: true },
  });

  if (!activeSession) {
    return res.status(401).json({ error: 'No hay una sesión activa' });
  }

  if (activeSession.user_id !== userId) {
    return res
      .status(401)
      .json({ error: 'La sesión no coincide con el usuario' });
  }

  next();
};

module.exports = verifySession;
