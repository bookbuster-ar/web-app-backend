// Books
const handleGetBooks = require('./books/handleGetBooks');
const handleGetBookById = require('./books/handleGetBookById');
const handleGetBooksByGenre = require('./books/handleGetBooksByGenre');
const handleGetBooksBySubgenre = require('./books/handleGetBooksBySubgenre');
const handleGetSubgenresByGenre = require('./books/handleGetSubgenresByGenre');
const handleCreateBook = require('./books/handleCreateBook');
const handleGetSubgenresByBook = require('./books/handleGetSubgenresByBook');

// Genres
const handleGetGenres = require('./genres/handleGetGenres');

// Editorial
const handleGetEditorials = require('./editorial/handleGetEditorials');
const handleGetCollection = require('./editorial/handleGetCollection');

//Payment
const handlePlaceOrder = require('./payment/handlePlaceOrder');
const handleSuccessfulPayment = require('./payment/handleSuccessfulPayment');
const handleFailurePayment = require('./payment/handleFailurePayment');
const handlePendingPayment = require('./payment/handlePendingPayment');

// Stock
const handleIncreaseStock = require('./stock/handleIncreaseStock');

module.exports = {
  // Books
  handleGetBooks,
  handleGetBookById,
  handleGetBooksByGenre,
  handleCreateBook,
  handleGetBooksBySubgenre,
  handleGetSubgenresByGenre,
  handleGetSubgenresByBook,

  // Genres
  handleGetGenres,

  // Editorial
  handleGetEditorials,
  handleGetCollection,

  //Payment
  handlePlaceOrder,
  handleSuccessfulPayment,
  handleFailurePayment,
  handlePendingPayment,

  // Stock
  handleIncreaseStock,
};
