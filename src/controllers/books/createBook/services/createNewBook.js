const { Book, BookToReview } = require('../../../../models/index');
const { v4: uuidv4 } = require('uuid');

const createNewBook = async (bookInfo, editorialInstance, transaction) => {
  await Book.create(
    {
      id: bookInfo.id,
      title: bookInfo.title,
      author: bookInfo.author,
      publication_year: bookInfo.publication_year,
      editorial_id: editorialInstance.id,
      editorial_collection_id: null,
    },
    { transaction }
  );

  await BookToReview.create(
    {
      id: uuidv4(),
      user_id: '85335cdd-1827-4c67-8f8c-095b3b201ca4',
      book_id: bookInfo.id,
      review_status: false,
    },
    { transaction }
  );
};

module.exports = createNewBook;
