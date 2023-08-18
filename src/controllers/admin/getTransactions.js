// const {
//   Transaction,
//   TransactionDetail,
//   User,
//   PublishedBook,
// } = require('../../models');

// const getTransactions = async (transactionId) => {
//   const transactionDetail = await TransactionDetail.findAll({
//     where: {
//       transaction_id: transactionId,
//     },
//   });
//   const transaction = await Transaction.findByPk(transactionId, {
//     where: {
//       id: transactionId,
//     },
//     include: [
//       {
//         model: User,
//         as: 'user',
//         attributes: ['name', 'last_name'],
//       },
//     ],
//   });
//   return {
//     transactionDetail: transactionDetail,
//     transactions: transaction,
//   };
// };

// module.exports = getTransactions;
