const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/IsAuthenticated");
const { upload } = require("../multer.js");
const catchAsyncErrors = require("../middlewares/CatchAsyncError.js");
const ErrorHandler = require("../middlewares/ErrorHandler");
const Post = require("../Models/Post.js");
//create a blog
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
//getting all pots
router.get(
  "/getposts",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.order === "asc" ? 1 : -1;
      const posts = await Post.find({
        ...(req.query.userId && { user: req.query.userId }),
        ...(req.query.category && { category: req.query.category }),
        ...(req.query.postId && { _id: req.query.postId }),
        ...(req.query.searchTerm && {
          $or: [
            {
              title: {
                $regex: req.query.searchTerm,
                options: "i",
              },
              description: {
                $regex: req.query.searchTerm,
                options: "i",
              },
            },
          ],
        }),
      })
        .sort({ updatedAt: sortDirection })
        .skip(startIndex)
        .limit(limit);

      //getting total numer of documnets
      const totalPost = await Post.countDocuments();
      //getting last month posts
      const data = new Date();
      const oneMonthago = new Date(
        data.getFullYear(),
        data.getMonth() - 1,
        data.getDate()
      );
      const totalPostofMonth = await Post.countDocuments({
        updatedAt: {
          $gte: oneMonthago,
        },
      });
      res.status(200).json({
        success: true,
        posts,
        totalPostofMonth,
        totalPost,
      });
    } catch (error) {}
  })
);
//deleting post
router.delete(
  "/delete-post/:postId/:userId",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
      return next(
        new ErrorHandler("You are not allowed to delete a blog!!", 400)
      );
    } else {
      const deletedpost = await Post.findByIdAndDelete({
        _id: req.params.postId,
      });
      res.status(200).json({
        message: "ok",
      });
    }
  })
);
// Update the post images
router.post(
  "/upload-image",
  upload.array("image", 100), // Updated field name to "image"
  catchAsyncErrors(async (req, res, next) => {
    const filename = req.files.map((f) => f.filename);
    res.status(200).json(filename);
  })
);
//updateComplete post
router.put(
  "/update-post/:id",

  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const check = await Post.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          images: req.body.images,
          user: req.user.id,
          category: req.body.category,
        },
      }
    );
    res.status(200).json({
      success: true,
      check,
    });
  })
);

module.exports = router;
