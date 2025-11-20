const Comment = require("../Models/Comment");
const { errorHandler } = require("../Helper/ErrorHandler");

exports.createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const comment = new Comment({
      author: req.auth._id,
      text,
    });
    const saved = await comment.save();
    const populated = await Comment.findById(saved._id).populate(
      "author",
      "_id name email"
    );
    return res.json(populated);
  } catch (err) {
    return res.status(400).json({ error: errorHandler(err) });
  }
};

exports.getComments = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || "1"));
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit || "10")));
    const sort = req.query.sort || "newest";

    let sortObj;
    if (sort === "most_liked") {
      sortObj = { likesCount: -1, createdAt: -1 };
    } else if (sort === "most_disliked") {
      sortObj = { dislikesCount: -1, createdAt: -1 };
    } else {
      sortObj = { createdAt: -1 };
    }

    const pipeline = [
      {
        $addFields: {
          likesCount: { $size: { $ifNull: ["$likes", []] } },
          dislikesCount: { $size: { $ifNull: ["$dislikes", []] } },
        },
      },
      { $sort: sortObj },
      { $skip: (page - 1) * limit },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $lookup: {
          from: "users",
          localField: "replies.author",
          foreignField: "_id",
          as: "replyAuthors",
        },
      },

      {
        $addFields: {
          replies: {
            $map: {
              input: "$replies",
              as: "reply",
              in: {
                _id: "$$reply._id",
                text: "$$reply.text",
                createdAt: "$$reply.createdAt",
                updatedAt: "$$reply.updatedAt",
                author: {
                  $let: {
                    vars: {
                      user: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: "$replyAuthors",
                              as: "u",
                              cond: { $eq: ["$$u._id", "$$reply.author"] },
                            },
                          },
                          0,
                        ],
                      },
                    },
                    in: {
                      _id: "$$user._id",
                      name: "$$user.name",
                      email: "$$user.email",
                      createdAt: "$$user.createdAt",
                      updatedAt: "$$user.updatedAt",
                    },
                  },
                },
              },
            },
          },
        },
      },

      {
        $project: {
          "author.hash_password": 0,
          "author.salt": 0,
          "replyAuthors.hash_password": 0,
          "replyAuthors.salt": 0,
        },
      },
    ];

    const comments = await Comment.aggregate(pipeline);
    const total = await Comment.countDocuments();

    return res.json({
      comments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    return res.status(400).json({ error: errorHandler(err) });
  }
};

exports.updateComment = async (req, res) => {
  try {
    req.comment.text = req.body.text || req.comment.text;
    const saved = await req.comment.save();
    const populated = await Comment.findById(saved._id).populate(
      "author",
      "_id name email"
    );
    return res.json(populated);
  } catch (err) {
    return res.status(400).json({ error: errorHandler(err) });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const result = await Comment.deleteOne({ _id: req.comment._id });
    if (result.deletedCount && result.deletedCount > 0) {
      return res.json({ message: "Comment deleted" });
    }
  } catch (err) {
    return res.status(400).json({ error: errorHandler(err) });
  }
};

exports.likeComment = async (req, res) => {
  try {
    const userId = req.auth._id;
    const comment = req.comment;

    const liked = comment.likes.some((id) => id.toString() === userId);
    const disliked = comment.dislikes.some((id) => id.toString() === userId);

    if (liked) {
      comment.likes = comment.likes.filter((id) => id.toString() !== userId);
    } else {
      comment.likes.push(userId);
      if (disliked) {
        comment.dislikes = comment.dislikes.filter(
          (id) => id.toString() !== userId
        );
      }
    }

    const saved = await comment.save();
    const populated = await Comment.findById(saved._id).populate(
      "author",
      "_id name email"
    );
    return res.json(populated);
  } catch (err) {
    return res.status(400).json({ error: errorHandler(err) });
  }
};

exports.dislikeComment = async (req, res) => {
  try {
    const userId = req.auth._id;
    const comment = req.comment;

    const disliked = comment.dislikes.some((id) => id.toString() === userId);
    const liked = comment.likes.some((id) => id.toString() === userId);

    if (disliked) {
      comment.dislikes = comment.dislikes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      comment.dislikes.push(userId);
      if (liked) {
        comment.likes = comment.likes.filter((id) => id.toString() !== userId);
      }
    }

    const saved = await comment.save();
    const populated = await Comment.findById(saved._id).populate(
      "author",
      "_id name email"
    );

    return res.json(populated);
  } catch (err) {
    return res.status(400).json({ error: errorHandler(err) });
  }
};

exports.replyToComment = async (req, res) => {
  try {
    const { text } = req.body;
    const reply = { author: req.auth._id, text };
    req.comment.replies.push(reply);
    const saved = await req.comment.save();
    const populated = await Comment.findById(saved._id)
      .populate("author", "_id name email")
      .populate("replies.author", "_id name email");
    return res.json(populated);
  } catch (err) {
    return res.status(400).json({ error: errorHandler(err) });
  }
};
