const Models = require('./index');

//! User

//User-Role
Models.Role.hasMany(Models.User, { foreignKey: 'role_id', as: 'users' });
Models.User.belongsTo(Models.Role, { foreignKey: 'role_id', as: 'role' });

//User-Session
Models.User.hasOne(Models.Session, { foreignKey: 'user_id', as: 'session' });
Models.Session.belongsTo(Models.User, { foreignKey: 'user_id', as: 'user' });

// User-Image
Models.UserImage.hasOne(Models.User, { foreignKey: 'image_id', as: 'user' });
Models.User.belongsTo(Models.UserImage, {
  foreignKey: 'image_id',
  as: 'image',
});

//* User-BookShelves
Models.User.hasOne(Models.BookShelves, {
  foreignKey: 'user_id',
  as: 'book_shelves',
});
Models.BookShelves.belongsTo(Models.User, {
  foreignKey: 'user_id',
  as: 'user',
});

//* User-Review
Models.User.hasMany(Models.Review, {
  foreignKey: 'user_id',
  as: 'reviews',
});
Models.Review.belongsTo(Models.User, { foreignKey: 'user_id', as: 'creator' });

//* User-ReviewLike
Models.User.hasMany(Models.ReviewLike, {
  foreignKey: 'user_id',
  as: 'review_likes',
});
Models.ReviewLike.belongsTo(Models.User, { foreignKey: 'user_id', as: 'user' });

//* User-Comment
Models.User.hasMany(Models.Comment, {
  foreignKey: 'user_id',
  as: 'comments',
});
Models.Comment.belongsTo(Models.User, { foreignKey: 'user_id', as: 'by' });

//* User-CommentLike
Models.User.hasMany(Models.CommentLike, {
  foreignKey: 'user_id',
  as: 'comments_likes',
});
Models.CommentLike.belongsTo(Models.User, {
  foreignKey: 'user_id',
  as: 'user',
});

//* User-Transaction
Models.User.hasMany(Models.Transaction, {
  foreignKey: 'user_id',
  as: 'transactions',
});
Models.Transaction.belongsTo(Models.User, {
  foreignKey: 'user_id',
  as: 'user',
});

//* User-BookToReview
Models.User.hasMany(Models.BookToReview, {
  foreignKey: 'user_id',
  as: 'books_to_review',
});
Models.BookToReview.belongsTo(Models.User, {
  foreignKey: 'user_id',
  as: 'user',
});

//* User-Quote
Models.User.hasMany(Models.Quote, {
  foreignKey: 'user_id',
  as: 'quotes',
});
Models.Quote.belongsTo(Models.User, { foreignKey: 'user_id', as: 'creator' });

//* User-QuoteLike
Models.User.hasMany(Models.QuoteLike, {
  foreignKey: 'user_id',
  as: 'quote_likes',
});
Models.QuoteLike.belongsTo(Models.User, { foreignKey: 'user_id', as: 'user' });

//! Book

//* Book-Quote
Models.Book.hasMany(Models.Quote, { foreignKey: 'book_id', as: 'quotes' });
Models.Quote.belongsTo(Models.Book, { foreignKey: 'book_id', as: 'book' });

//* Book-Review
Models.Book.hasMany(Models.Review, { foreignKey: 'book_id', as: 'reviews' });
Models.Review.belongsTo(Models.Book, { foreignKey: 'book_id', as: 'book' });

//* Book-BookImage
Models.Book.hasMany(Models.BookImage, {
  foreignKey: 'book_id',
  as: 'images',
});
Models.BookImage.belongsTo(Models.Book, {
  foreignKey: 'book_id',
  as: 'book',
});

//* Book-BookDetail
Models.Book.hasOne(Models.BookDetail, { foreignKey: 'book_id', as: 'detail' });
Models.BookDetail.belongsTo(Models.Book, { foreignKey: 'book_id', as: 'book' });

//* Book-BookGenre
Models.Book.belongsToMany(Models.BookGenre, {
  through: Models.BookGenreInterm,
  foreignKey: 'book_id',
  as: 'genres',
});
Models.BookGenre.belongsToMany(Models.Book, {
  through: Models.BookGenreInterm,
  foreignKey: 'genre_id',
  as: 'books',
});

//* Book-BookFormat
Models.Book.belongsToMany(Models.BookFormat, {
  through: Models.BookFormatInterm,
  foreignKey: 'book_id',
  as: 'formats',
});
Models.BookFormat.belongsToMany(Models.Book, {
  through: Models.BookFormatInterm,
  foreignKey: 'book_format_id',
  as: 'books',
});

//* Books-Transaction
Models.PublishedBook.belongsToMany(Models.Transaction, {
  through: Models.TransactionDetail,
  foreignKey: 'published_book_id',
  as: 'transactions',
});
Models.Transaction.belongsToMany(Models.PublishedBook, {
  through: Models.TransactionDetail,
  foreignKey: 'transaction_id',
  as: 'books',
});

//* Book-BookToReview

Models.Book.hasMany(Models.BookToReview, {
  foreignKey: 'book_id',
  as: 'books_to_review',
});
Models.BookToReview.belongsTo(Models.Book, {
  foreignKey: 'book_id',
  as: 'book',
});

//* Book-BookShelfCategory
Models.Book.belongsToMany(Models.BookShelfCategory, {
  through: Models.BookShelfCategoryInterm,
  foreignKey: 'book_id',
  as: 'shelf_categories',
});
Models.BookShelfCategory.belongsToMany(Models.Book, {
  through: Models.BookShelfCategoryInterm,
  foreignKey: 'book_shelf_category_id',
  as: 'books',
});

//* Book-PublishedBook
Models.Book.hasOne(Models.PublishedBook, {
  foreignKey: 'book_id',
  as: 'published_book',
});
Models.PublishedBook.belongsTo(Models.Book, {
  foreignKey: 'book_id',
  as: 'book',
});

//* PublishedBook-SaleStock
Models.BookFormatInterm.hasOne(Models.SaleStock, {
  foreignKey: 'book_format_interm_id',
  as: 'sale_stock',
});
Models.SaleStock.belongsTo(Models.BookFormatInterm, {
  foreignKey: 'book_format_interm_id',
  as: 'book_format_interm',
});

//*PublishedBook - Format
Models.PublishedBook.belongsToMany(Models.BookFormat, {
  through: Models.PublishedBookPrice,
  foreignKey: 'published_book_id',
  as: 'formats',
});
Models.BookFormat.belongsToMany(Models.PublishedBook, {
  through: Models.PublishedBookPrice,
  foreignKey: 'book_format_id',
  as: 'published_books',
});

//* BookFormatInterm - RentStock
Models.BookFormatInterm.hasOne(Models.RentStock, {
  foreignKey: 'book_format_interm_id',
  as: 'rent_stock',
});
Models.RentStock.belongsTo(Models.BookFormatInterm, {
  foreignKey: 'book_format_interm_id',
  as: 'book_format_interm',
});

//! EditorialCollection

//* EditorialCollection-Book

Models.Book.belongsTo(Models.EditorialCollection, {
  foreignKey: 'editorial_collection_id',
  as: 'editorial_collection',
});

Models.EditorialCollection.hasMany(Models.Book, {
  foreignKey: 'editorial_collection_id',
  as: 'books',
});

//! Editorial

// Editorial-Book
Models.Editorial.hasMany(Models.Book, {
  foreignKey: 'editorial_id',
  as: 'books',
});
Models.Book.belongsTo(Models.Editorial, {
  foreignKey: 'editorial_id',
  as: 'editorial',
});

//* Editorial-EditorialCollection
Models.Editorial.hasMany(Models.EditorialCollection, {
  foreignKey: 'editorial_id',
  as: 'editorial_collections',
});
Models.EditorialCollection.belongsTo(Models.Editorial, {
  foreignKey: 'editorial_id',
  as: 'editorial',
});

//! Payment Method

//* PaymentMethod-Transaction
Models.PaymentMethod.hasOne(Models.Transaction, {
  foreignKey: 'payment_method_id',
  as: 'transaction',
});
Models.Transaction.belongsTo(Models.PaymentMethod, {
  foreignKey: 'payment_method_id',
  as: 'payment_method',
});

//! Review

//* Review-Comment
Models.Review.hasMany(Models.Comment, {
  foreignKey: 'review_id',
  as: 'comments',
  onDelete: 'CASCADE',
  hooks: true,
});
Models.Comment.belongsTo(Models.Review, {
  foreignKey: 'review_id',
  as: 'review',
});

// Review-ReviewLike
Models.Review.hasMany(Models.ReviewLike, {
  foreignKey: 'review_id',
  as: 'likes',
  onDelete: 'CASCADE',
  hooks: true,
});
Models.ReviewLike.belongsTo(Models.Review, {
  foreignKey: 'review_id',
  as: 'review',
});

//! Quote

//* Quote-QuoteLike
Models.Quote.hasMany(Models.QuoteLike, {
  foreignKey: 'quote_id',
  as: 'likes',
  onDelete: 'CASCADE',
  hooks: true,
});
Models.QuoteLike.belongsTo(Models.Quote, {
  foreignKey: 'quote_id',
  as: 'quote',
});

//! Comment

// Comment-CommentLike
Models.Comment.hasMany(Models.CommentLike, {
  foreignKey: 'comment_id',
  as: 'likes',
  onDelete: 'CASCADE',
  hooks: true,
});
Models.CommentLike.belongsTo(Models.Comment, {
  foreignKey: 'comment_id',
  as: 'comment',
});

//! BookShelves

Models.BookShelves.hasMany(Models.BookShelfCategory, {
  foreignKey: 'book_shelves_id',
  as: 'book_shelf_categories',
});
Models.BookShelfCategory.belongsTo(Models.BookShelves, {
  foreignKey: 'book_shelves_id',
  as: 'book_shelves',
});

//! BookReaction
//*Book-User

Models.User.belongsToMany(Models.Book, {
  through: Models.Reaction,
  foreignKey: 'user_id',
  as: 'reactions',
});
Models.Book.belongsToMany(Models.User, {
  through: Models.Reaction,
  foreignKey: 'book_id',
  as: 'reactions',
});

// BookGenre - BookSubgenre
Models.BookSubgenre.belongsToMany(Models.BookGenre, {
  through: Models.GenreSubgenreInterm,
  foreignKey: 'book_subgenre_id',
  as: 'genres',
});
Models.BookGenre.belongsToMany(Models.BookSubgenre, {
  through: Models.GenreSubgenreInterm,
  foreignKey: 'book_genre_id',
  as: 'subgenres',
});

// Book - BookSubgenre
Models.Book.belongsToMany(Models.BookSubgenre, {
  through: Models.BookSubgenreInterm,
  foreignKey: 'book_id',
  as: 'subgenres',
});
Models.BookSubgenre.belongsToMany(Models.Book, {
  through: Models.BookSubgenreInterm,
  foreignKey: 'book_subgenre_id',
  as: 'books',
});

//! UserDetail - User
Models.User.hasOne(Models.UserDetail, {
  foreignKey: 'user_id',
  as: 'detail',
});
Models.UserDetail.belongsTo(Models.User, {
  foreignKey: 'user_id',
  as: 'user',
});

//! User - BookGenre
Models.User.belongsToMany(Models.BookGenre, {
  through: Models.UserBookGenreInterm,
  foreignKey: 'user_id',
  as: 'favoriteGenres',
});
Models.BookGenre.belongsToMany(Models.User, {
  through: Models.UserBookGenreInterm,
  foreignKey: 'book_genre_id',
  as: 'users',
});
