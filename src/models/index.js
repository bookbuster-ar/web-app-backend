// Book
module.exports = {
  Book: require('./Book/Book'),
  BookDetail: require('./Book/BookDetail'),
  BookGenre: require('./Book/BookGenre'),
  BookImage: require('./Book/BookImage'),
  Editorial: require('./Book/Editorial'),
  Format: require('./Book/Format'),
  PublishedBook: require('./Book/PublishedBook'),
  EditorialCollection: require('./Book/EditorialCollection'),
};

// User
module.exports = {
  User: require('./User/User'),
  UserImage: require('./User/UserImage'),
  Rol: require('./User/Role'),
  Session: require('./User/Session'),
};

// Sale
module.exports = {
  SaleStock: require('./Sale/SaleStock'),
  Transaction: require('./Sale/Transaction'),
  TransactionDetail: require('./Sale/TransactionDetail'),
  PaymentMethod: require('./Sale/PaymentMethod'),
};

// Rent
module.exports = {
  RentStock: require('./Rent/RentStock'),
};

// Review
module.exports = {
  Review: require('./Review/Review'),
  Comment: require('./Review/Comment'),
  ReviewLike: require('./Review/ReviewLike'),
  CommentLike: require('./Review/CommentLike'),
};

// Admin
module.exports = {
  BookToReview: require('./Admin/BookToReview'),
};

// Shelves
module.exports = {
  BookShelves: require('./Shelves/BookShelves'),
  BookShelfCategory: require('./Shelves/BookShelfCategory'),
};
