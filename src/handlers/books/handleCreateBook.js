const { createBook } = require('../../controllers');

const handleCreateBook = async (req, res) => {
  try {
    const {
      title,
      author,
      publication_year,
      editorial,
      editorial_collection,
      genres,
      size,
      pages,
      subgenres,
      synopsis,
    } = req.body;

    const { status } = await createBook({
      title,
      author,
      publication_year,
      editorial,
      editorial_collection,
      genres,
      subgenres,
      pages,
      size,
      synopsis,
      images: req.files,
    });
    if (status === 201) {
      return res.statusCode(status);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// setForm({
//   title: '',
//   author: '',
//   publication_year: '',
//   editorial: '',
//   editorial_collection: '',
//   genres: [],
//   synopsis: '',
//   pages: '',
//   language: '',
//   size: '',
//   price: '',
//   images: {
//     cover: {},
//     extra: [], //arreglo de objetos
//   },
// });

module.exports = handleCreateBook;
