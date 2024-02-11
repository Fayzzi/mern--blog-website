const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();
  const tokenOPtions = {
    httpOnly: true,
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  };
  res.status(statusCode).cookie("user_token", token, tokenOPtions).json({
    success: true,
    message: "success",
    user,
    token,
  });
};
module.exports = sendToken;
