const Models = require('./index');

//! User

//User-Role
Models.Role.hasMany(Models.User, { foreignKey: 'role_id', as: 'users' });
Models.User.belongsTo(Models.Role, { foreignKey: 'role_id', as: 'role' });

//User-Session
Models.User.hasOne(Models.Session, { foreignKey: 'user_id', as: 'session' });
Models.Session.belongsTo(Models.User, { foreignKey: 'user_id', as: 'user' });

//User-Image
Models.UserImage.hasOne(Models.User, { foreignKey: 'image_id', as: 'user' });
Models.User.belongsTo(Models.UserImage, {
  foreignKey: 'image_id',
  as: 'image',
});

//User-BookShelves
Models.User.hasOne(Models.BookShelves, {
  foreignKey: 'user_id',
  as: 'book_shelves',
});
Models.BookShelves.belongsTo(Models.User, {
  foreignKey: 'user_id',
  as: 'user',
});

//User-Review
Models.User.hasMany(Models.Review, {
  foreignKey: 'user_id',
  as: 'reviews',
});
Models.Review.belongsTo(Models.User, { foreignKey: 'user_id', as: 'user' });

//User-ReviewLike
Models.User.hasMany(Models.ReviewLike, {
  foreignKey: 'user_id',
  as: 'review_likes',
});
Models.ReviewLike.belongsTo(Models.User, { foreignKey: 'user_id', as: 'user' });

//User-Comment
Models.User.hasMany(Models.Comment, {
  foreignKey: 'user_id',
  as: 'comments',
});
Models.Comment.belongsTo(Models.User, { foreignKey: 'user_id', as: 'user' });

//User-CommentLike
Models.User.hasMany(Models.CommentLike, {
  foreignKey: 'user_id',
  as: 'comments_likes',
});
Models.CommentLike.belongsTo(Models.User, {
  foreignKey: 'user_id',
  as: 'user',
});

//User-Transaction
Models.User.hasMany(Models.Transaction, {
  foreignKey: 'user_id',
  as: 'transactions',
});
Models.Transaction.belongsTo(Models.User, {
  foreignKey: 'user_id',
  as: 'user',
});

//User-BookToReview
Models.User.hasMany(Models.BookToReview, {
  foreignKey: 'user_id',
  as: 'books_to_review',
});
Models.BookToReview.belongsTo(Models.User, {
  foreignKey: 'user_id',
  as: 'user',
});

//!Books

//Book-Review
Models.Book.hasMany(Models.Review, { foreignKey: 'book_id', as: 'reviews' });
Models.Review.belongsTo(Models.Book, { foreignKey: 'book_id', as: 'book' });

//Book-BookImage
Models.Book.hasMany(Models.BookImage, {
  foreignKey: 'book_id',
  as: 'images',
});
Models.BookImage.belongsTo(Models.Book, {
  foreignKey: 'book_id',
  as: 'book',
});

//Book-BookDetail
Models.Book.hasOne(Models.BookDetail, { foreignKey: 'book_id', as: 'detail' });
Models.BookDetail.belongsTo(Models.Book, { foreignKey: 'book_id', as: 'book' });

//Book-BookGenre
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

//Book-BookFormat
Models.Book.belongsToMany(Models.BookFormat, {
  through: Models.BookFormatInterm,
  foreignKey: 'book_id',
  as: 'formats',
});
Models.BookFormat.belongsToMany(Models.Book, {
  through: Models.BookFormatInterm,
  foreignKey: 'book_format_id',
  as: 'books',
})

//Books-Transaction
Models.Book.belongsToMany(Models.Transaction, {
  through: Models.TransactionDetail,
  foreignKey: 'book_id',
  as: 'transactions',
})
Models.Transaction.belongsToMany(Models.Book, {
  through: Models.TransactionDetail,
  foreignKey: 'transaction_id',
  as: 'books',
})

//Book-BookToReview

Models.Book.hasMany(Models.BookToReview, {
  foreignKey: 'book_id',
  as: 'books_to_review',  
});
Models.BookToReview.belongsTo(Models.Book, {
  foreignKey: 'book_id',
  as: 'book',
});

//Book-BookShelfCategory
Models.Book.belongsToMany(Models.BookShelfCategory, {
  through: Models.BookShelfCategoryInterm,
  foreignKey: 'book_id',
  as: 'shelf_categories',  
});
Models.BookShelfCategory.belongsToMany(Models.Book, {
  through: Models.BookShelfCategoryInterm,
  foreignKey: 'shelf_category_id',
  as: 'books',
});


