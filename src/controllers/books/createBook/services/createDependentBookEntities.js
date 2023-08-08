const { BookDetail, BookToReview } = require('@models');
const { v4: uuidv4 } = require('uuid');

const createDependentBookEntities = async (bookInfo, transaction) => {
  const dependentOperationList = [
    BookDetail.create(
      {
        id: uuidv4(),
        book_id: bookInfo.id,
        synopsis: bookInfo.synopsis,
        pages: bookInfo.pages,
        isbn: null,
        language: bookInfo.language,
        size: bookInfo.size,
        price: bookInfo.price,
        subgenre: JSON.stringify(bookInfo.subgenres),
      },
      { transaction }
    ),
    BookToReview.create(
      {
        id: uuidv4(),
        review_status: false,
        user_id: '85335cdd-1827-4c67-8f8c-095b3b201ca4',
        book_id: bookInfo.id,
      },
      { transaction }
    ),
  ];

  await Promise.all(dependentOperationList);
};

module.exports = createDependentBookEntities;
