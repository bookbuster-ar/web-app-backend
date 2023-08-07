const handleCreateBook = async (req, res) => {
  const {
    title,
    author,
    publication_year,
    editorial,
    editorial_collection,
    genres,
    subgenres,
  } = req.body;
  console.log(req.body);
  console.log(req.files);
  res.send('Llegamos, banda! vamooo los pibeeesss');
};

module.exports = handleCreateBook;
