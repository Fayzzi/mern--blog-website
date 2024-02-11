const catchAsyncErrors = require("./../middlewares/CatchAsyncError.js");
const ErrorHandler = require("./../middlewares/ErrorHandler");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("./../Models/User");
const sendToken = require("../Utils/UserJwtToken.js");
registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ErrorHandler(500, "All fields must be filled"));
  } else {
    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
      return next(new ErrorHandler("Email is already registred!!", 500));
    }
    const user = {
      name,
      email,
      password,
    };
    const activationtoken = createActivationToken(user);
    const activation_url =
      "http://localhost:5173/activation/" + activationtoken;
    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click the link to activate your account: ${activation_url}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email (${user.email}) for activating your account.`,
      });
    } catch (error) {
      return next(new ErrorHandler(500, error.message));
    }
  }
});
//create Activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};
//token sender
const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASS,
    },
  });
  await transporter.sendMail({
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  });
};
//activating user
userActivation = catchAsyncErrors(async (req, res, next) => {
  const { activationtoken } = req.params;
  const userData = jwt.verify(
    activationtoken,
    process.env.ACTIVATION_TOKEN_SECRET
  );
  const checkUser = await User.findOne({ email: userData.email });
  if (checkUser) {
    return next(new ErrorHandler("Email is already registred!!", 500));
  } else {
    const newUser = await User.create({
      email: userData.email,
      name: userData.name,
      password: userData.password,
    });
    sendToken(newUser, 200, res);
  }
});
//login api
loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  const checkUser = await User.findOne({ email: email }).select("+password");
  if (checkUser) {
    //check if the password is valid or not
    const passwordValid = checkUser.comparePassword(password);
    if (passwordValid) {
      sendToken(checkUser, 200, res);
    } else {
      return next(new ErrorHandler("Password is incorrect", 500));
    }
  } else {
    return next(
      new ErrorHandler("No user found with these email address", 500)
    );
  }
});
//getting current looged in user
getuser = catchAsyncErrors(async (req, res, next) => {
  const getUser = await User.findById(req.user.id);
  if (!getUser) {
    return next(new ErrorHandler("Please log in first!!", 500));
  }
  res.status(200).json({
    success: true,
    getUser,
  });
});

module.exports = {
  registerUser,
  userActivation,
  getuser,
  loginUser,
};
