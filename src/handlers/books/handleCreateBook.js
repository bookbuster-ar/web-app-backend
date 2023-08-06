const handleCreateBook = async (error, req, res, next) => {
  const {
    title,
    author,
    publication_year,
    editorial,
    editorial_collection,
    genres,
    subgenres,
  } = req.body;
  res.send('Book created!');
};

module.exports = handleCreateBook;
