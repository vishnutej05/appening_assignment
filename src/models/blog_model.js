const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    authorId: {
      // Store the user's ObjectId directly
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    authorEmail: {
      // Store the user's email directly
      type: String,
      required: true,
    },
    assignedEditor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
