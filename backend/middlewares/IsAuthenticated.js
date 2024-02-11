const jwt = require("jsonwebtoken");
const ErrorHandler = require("./ErrorHandler");
const User = require("./../Models/User");
exports.isAuthenticated = async (req, res, next) => {
  try {
    const { user_token } = req.cookies;
    if (user_token) {
      return next(new ErrorHandler("Authentication Error!!", 500));
    }
    const userData = jwt.verify(user_token, JWT_TOKEN_SECRET);
    req.user = await User.findById(userData.id);
    next();
  } catch (error) {
    return next(new ErrorHandler("Authentication Error!!", 500));
  }
};
