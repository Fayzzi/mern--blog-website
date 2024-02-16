const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/IsAuthenticated");
const { upload } = require("../multer.js");
const catchAsyncErrors = require("../middlewares/CatchAsyncError.js");
const ErrorHandler = require("../middlewares/ErrorHandler");
const Post = require("../Models/Post.js");

router.post(
  "/post-a-blog",
  upload.array("files", 100),
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { title, category, description } = req.body;

      if (!req.user.isAdmin) {
        return next(
          new ErrorHandler("You are not allowed to create a blog!!", 400)
        );
      }

      let images = [];
      if (req.files) {
        images = req.files.map((file) => file.filename);
      }

      const newPost = await Post.create({
        title,
        description,
        category,
        images,
        user: req.user.id,
      });

      res.status(200).json({
        success: true,
        newPost,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
