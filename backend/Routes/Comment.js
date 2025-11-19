const express = require("express");
const router = express.Router();
const commentCtrl = require("../Controller/CommentController");
const { requireSignin } = require("../Controller/AuthController");
const { commentById, isCommentOwner } = require("../Middleware/Comment");
const {
  createCommentValidator,
  updateCommentValidator,
  replyValidator,
} = require("../Validator/Comment");

router.post(
  "/comment",
  requireSignin,
  createCommentValidator,
  commentCtrl.createComment
);

router.get("/comments", commentCtrl.getComments);

router.put(
  "/comment/:commentId",
  requireSignin,
  updateCommentValidator,
  commentById,
  isCommentOwner,
  commentCtrl.updateComment
);

router.delete(
  "/comment/:commentId",
  requireSignin,
  commentById,
  isCommentOwner,
  commentCtrl.deleteComment
);

router.put(
  "/comment/:commentId/like",
  requireSignin,
  commentById,
  commentCtrl.likeComment
);

router.put(
  "/comment/:commentId/dislike",
  requireSignin,
  commentById,
  commentCtrl.dislikeComment
);

router.post(
  "/comment/:commentId/reply",
  requireSignin,
  replyValidator,
  commentById,
  commentCtrl.replyToComment
);

router.param("commentId", commentById);

module.exports = router;
