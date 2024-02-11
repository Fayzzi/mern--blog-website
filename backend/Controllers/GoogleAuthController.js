const catchAsyncErrors = require("./../middlewares/CatchAsyncError.js");
const ErrorHandler = require("./../middlewares/ErrorHandler");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("./../Models/User");
const sendToken = require("./../Utils/UserJwtToken");
const express = require("express");
const router = express.Router();
router.post(
  "/google",
  catchAsyncErrors(async (req, res, next) => {
    const { name, email, avatar } = req.body;
    try {
      const alreadyUser = await User.findOne({ email: email }).select(
        "+password"
      );
      if (alreadyUser) {
        sendToken(alreadyUser, 200, res);
      } else {
        const newUser = await User.create({
          email,
          name:
            name.toLowerCase().split(" ").join("") +
            Math.random().toString(9).slice(-4),
          avatar,
          password: email,
        });
        sendToken(newUser, 200, res);
      }
    } catch (error) {
      return next(new ErrorHandler("Error", 500));
    }
  })
);
module.exports = router;
