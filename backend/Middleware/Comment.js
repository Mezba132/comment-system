const Comment = require("../Models/Comment");
const { errorHandler } = require("../Helper/ErrorHandler");

exports.commentById = async (req, res, next, id) => {
  try {
    const comment = await Comment.findById(id).populate(
      "author",
      "_id name email"
    );
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    req.comment = comment;
    next();
  } catch (err) {
    return res.status(400).json({ error: errorHandler(err) });
  }
};

exports.isCommentOwner = (req, res, next) => {
  try {
    const userId = req.auth && req.auth._id;
    const ownerId =
      req.comment && req.comment.author && req.comment.author._id.toString();
    if (!userId || ownerId !== userId) {
      return res
        .status(403)
        .json({ error: "User is not authorized to perform this action" });
    }
    next();
  } catch (err) {
    return res.status(400).json({ error: errorHandler(err) });
  }
};
