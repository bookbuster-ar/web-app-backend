const Models = require('./index');

//! User

//User-Role
Models.Role.hasMany(Models.User, { foreignKey: 'role_id', as: 'users' });
Models.User.belongsTo(Models.Role, { foreignKey: 'role_id', as: 'role' });

//User-Session
Models.User.hasOne(Models.Session, { foreignKey: 'user_id', as: 'session' });
Models.Session.belongsTo(Models.User, { foreignKey: 'user_id', as: 'user' });

//User-Image
Models.User.belongsTo(Models.UserImage, {
  foreignKey: 'image_id',
  as: 'image',
});
Models.UserImage.hasOne(Models.User, { foreignKey: 'image_id', as: 'user' });

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

//User-Comment
Models.User.hasMany(Models.Comment, {
  foreignKey: 'user_id',
  as: 'comments',
});
Models.Comment.belongsTo(Models.User, { foreignKey: 'user_id', as: 'user' });

//User-ReviewLike
Models.User.hasMany(Models.ReviewLike, {
  foreignKey: 'user_id',
  as: 'review_likes',
});
Models.ReviewLike.belongsTo(Models.User, { foreignKey: 'user_id', as: 'user' });
