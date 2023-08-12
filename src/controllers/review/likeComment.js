const { CommentLike, Comment, User } = require('../../models');
const sequelize = require('../../config/database');

const likeComment = async ({ commentId, userId }) => {
  const transaction = await sequelize.transaction();
  try {
    const likeCommentPromise = CommentLike.create(
      {
        comment_id: commentId,
        user_id: userId,
      },
      { transaction }
    );

    const getLikedCommentPromise = Comment.findOne({
      where: {
        id: commentId,
      },
      transaction,
    });

    const getUserLikingPromise = User.findByPk(userId, {
      attributes: ['id', 'name', 'last_name'],
      include: ['image'],
      transaction,
    });

    const [likeComment, likedComment, userWhoLiked] = Promise.all([
      likeCommentPromise,
      getLikedCommentPromise,
      getUserLikingPromise,
    ]);

    await transaction.commit();

    return {
      reacted: 'like',
      by: { ...userWhoLiked.toJSON() },
      in: { ...likedComment.toJSON() },
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = likeComment;
