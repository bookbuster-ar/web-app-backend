const { postPriceFormatBook } = require('../../controllers');

const handlePostPriceAndFormat = async (req, res) => {
  try {
    const { published_book_id, book_format_id, price } = req.body[0];

    const register = await postPriceFormatBook(
      published_book_id,
      book_format_id,
      price
    );

    return res.status(200).json(register);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handlePostPriceAndFormat;
