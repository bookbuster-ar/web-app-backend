const { Book } = require('@models');

const createNewBook = async (
  bookInfo,
  editorialInstance,
  collectionInstance,
  transaction
) => {
  await Book.create(
    {
      id: bookInfo.id,
      title: bookInfo.title,
      author: bookInfo.author,
      publication_year: bookInfo.publication_year,
      editorial_id: editorialInstance.id,
      editorial_collection_id: collectionInstance?.id,
    },
    { transaction }
  );
};

module.exports = createNewBook;
