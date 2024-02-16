const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    avatar: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
//hashing password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
//getting jwtToken
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: process.env.JWT_TOKEN_DURATION,
  });
};
//comparing passwords
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model("blog-user", userSchema);
