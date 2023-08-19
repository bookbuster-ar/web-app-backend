const { Quote, User, QuoteLike, PublishedBook } = require('../../models');
const { timeAgo } = require('../../utils');

const getBookQuotes = async (bookId) => {
  const publishedBook = await PublishedBook.findByPk(bookId);
  const rawQuotes = await Quote.findAll({
    where: { book_id: publishedBook.book_id },
    attributes: { exclude: ['user_id', 'book_id'] },
    include: [
      {
        model: User,
        as: 'creator',
        attributes: ['id', 'name', 'last_name'],
        include: ['image'],
      },
      {
        model: QuoteLike,
        as: 'likes',
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'name', 'last_name'],
            include: ['image'],
          },
        ],
      },
    ],
  });
  if (!rawQuotes) {
    return [];
  }
  return rawQuotes.map((quote) => {
    const { createdAt, updatedAt, ...relevantQuoteInfo } = quote.toJSON();
    return {
      ...relevantQuoteInfo,
      createdAt: timeAgo(createdAt),
      likes: {
        count: relevantQuoteInfo.likes.length,
        whoLiked: relevantQuoteInfo.likes.map((like) => like.user),
      },
    };
  });
};

module.exports = getBookQuotes;
