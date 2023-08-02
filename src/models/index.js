module.exports = {
  // Book
  Book: require('./Book/Book'),
  BookDetail: require('./Book/BookDetail'),
  BookGenre: require('./Book/BookGenre'),
  BookImage: require('./Book/BookImage'),
  Editorial: require('./Book/Editorial'),
  Format: require('./Book/Format'),
  PublishedBook: require('./Book/PublishedBook'),
  EditorialCollection: require('./Book/EditorialCollection'),

  // User
  User: require('./User/User'),
  UserImage: require('./User/UserImage'),
  Role: require('./User/Role'),
  Session: require('./User/Session'),

  // Sale
  SaleStock: require('./Sale/SaleStock'),
  Transaction: require('./Sale/Transaction'),
  TransactionDetail: require('./Intermediate/TransactionDetail'),
  PaymentMethod: require('./Sale/PaymentMethod'),

  // Rent
  RentStock: require('./Rent/RentStock'),

  // Review
  Review: require('./Review/Review'),
  Comment: require('./Review/Comment'),
  ReviewLike: require('./Review/ReviewLike'),
  CommentLike: require('./Review/CommentLike'),

  // Admin
  BookToReview: require('./Admin/BookToReview'),

  // Shelves
  BookShelves: require('./Shelves/BookShelves'),
  BookShelfCategory: require('./Shelves/BookShelfCategory'),
};
