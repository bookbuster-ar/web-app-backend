const { User, Session } = require('../../models');
const sendBanNotification = require('../../services/sendBanNotification');
const cron = require('node-cron');

const banUser = async (userId, duration, reason) => {
  try {
    const user = await User.findByPk(userId);

    user.is_blocked = true;
    await user.save();

    const session = await Session.findOne({
      where: { user_id: userId },
    });

    if (session) {
      session.session_status = false;
      await session.save();
    }

    cron.schedule(`0 0 */${duration} * *`, async () => {
      try {
        const updatedUser = await User.findByPk(userId);
        if (updatedUser.is_blocked) {
          updatedUser.is_blocked = false;
          await updatedUser.save();
          console.log(
            `Usuario ${userId} desbloqueado después de ${duration} días.`
          );
        }
      } catch (error) {
        console.error('Error al actualizar el usuario:', error);
      }
    });
    sendBanNotification(user, duration, reason);

    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = banUser;
