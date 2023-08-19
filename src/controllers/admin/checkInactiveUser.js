// const { Op } = require('sequelize');
// const { User, Session } = require('../../models');
// const moment = require('moment');
// const cron = require('node-cron');

// const checkInactiveUser = async () => {
//   const currentDate = new Date();
//   try {
//     const users = await User.findAll({
//       include: [
//         {
//           model: Session,
//           as: 'sessions',
//           where: {
//             last_connection: {
//               [Op.gte]: ,
//             },
//           },
//         },
//       ],
//     });
//     for (const user of users) {
//       user.is_inactive = true;
//       await user.save();
//     }
//   } catch (error) {}
// };
