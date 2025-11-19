const { check, validationResult } = require("express-validator");

exports.createCommentValidator = [
  check("text")
    .notEmpty()
    .withMessage("Comment text is required")
    .isLength({ min: 1, max: 500 })
    .withMessage("Comment must be between 1 to 500 characters"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        err: errors.array()[0].msg,
      });
    }

    next();
  },
];

exports.updateCommentValidator = [
  check("text")
    .notEmpty()
    .withMessage("Comment text is required")
    .isLength({ min: 1, max: 500 })
    .withMessage("Comment must be between 1 to 500 characters"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        err: errors.array()[0].msg,
      });
    }

    next();
  },
];

exports.replyValidator = [
  check("text")
    .notEmpty()
    .withMessage("Reply text is required")
    .isLength({ min: 1, max: 300 })
    .withMessage("Reply must be between 1 to 300 characters"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        err: errors.array()[0].msg,
      });
    }

    next();
  },
];
