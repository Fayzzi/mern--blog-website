const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    images: {
      type: [],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("blog-Posts", postSchema);
