const { Book, BookToReview } = require('../../../../models');

const createNewBook = async (
  bookInfo,
  userId,
  editorialInstance,
  transaction
) => {
  const createdBook = await Book.create(
    {
      id: bookInfo.id,
      title: bookInfo.title,
      author: bookInfo.author,
      publication_year: bookInfo.publicationYear,
      editorial_id: editorialInstance.id,
      editorial_collection_id: null,
    },
    { transaction }
  );

  await BookToReview.create(
    {
      user_id: userId,
      book_id: createdBook.id,
      review_status: false,
    },
    { transaction }
  );
};

module.exports = createNewBook;
