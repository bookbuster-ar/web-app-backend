const { Quote } = require('../../models');

const deleteQuote = async (quoteId) => {
  const deleteCount = await Quote.destroy({
    where: { id: quoteId },
    hooks: true,
  });
  return deleteCount > 0;
};

module.exports = deleteQuote;
