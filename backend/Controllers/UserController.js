const catchAsyncErrors = require("./../middlewares/CatchAsyncError.js");
const ErrorHandler = require("./../middlewares/ErrorHandler");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ErrorHandler(500, "All fields must be filled"));
  } else {
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
    text: options.text,
  });
};

module.exports = {
  registerUser,
};
