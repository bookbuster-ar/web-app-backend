// Book
module.exports = {
  Book: require('./Book'),
  BookDetail: require('./BookDetail'),
  BookGenre: require('./BookGenre'),
  BookImage: require('./BookImage'),
  Editorial: require('./Editorial'),
  Format: require('./Format'),
  PublishedBook: require('./PublishedBook'),
};

// User
module.exports = {
  User: require('./User'),
  UserImage: require('./UserImage'),
  Rol: require('./Rol'),
  InactiveUser: require('./InactiveUser'),
  BlockUser: require('./BlockUser'),
  Session: require('./Session'),
};

// Sale
module.exports = {
  SaleStock: require('./SaleStock'),
  Transaction: require('./Transaction'),
  TransactionDetail: require('./TransactionDetail'),
  PaymentMethod: require('./PaymentMethod'),
};

// Rent
module.exports = {
  RentStock: require('./RentStock'),
};

// Review
module.exports = {
  Review: require('./Review'),
  Comment: require('./Comment'),
  ReviewLike: require('./ReviewLike'),
};

// Admin
module.exports = {
  BookToReview: require('./BookToReview'),
};

// Shelves
module.exports = {
  BookShelves: require('./BookShelves'),
  BookShelfCategory: require('./BookShelfCategory'),
};
