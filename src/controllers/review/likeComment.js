const { CommentLike, Comment, User } = require('../../models');
const sequelize = require('../../config/database');

const likeComment = async ({ commentId, userId }) => {
  const transaction = await sequelize.transaction();
  try {
    let likeExist = await CommentLike.findOne({
      where: {
        comment_id: commentId,
        user_id: userId,
      },
      transaction,
    });

    if (likeExist) {
      await likeExist.destroy({ transaction });
    } else {
      await CommentLike.create(
        {
          comment_id: commentId,
          user_id: userId,
        },
        { transaction }
      );
    }

    const getLikedCommentPromise = Comment.findOne({
      where: {
        id: commentId,
      },
      attributes: ['id', 'content'],
      transaction,
    });

    const getUserLikingPromise = User.findByPk(userId, {
      attributes: ['id', 'name', 'last_name'],
      include: ['image'],
      transaction,
    });

    const [likedComment, userWhoLiked] = await Promise.all([
      getLikedCommentPromise,
      getUserLikingPromise,
    ]);

    await transaction.commit();

    return {
      reacted: likeExist ? 'dislike' : 'like',
      by: { ...userWhoLiked.toJSON() },
      inComment: { ...likedComment.toJSON() },
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = likeComment;
