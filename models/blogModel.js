const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, default: "https://via.placeholder.com/800x400" },
    category: { type: String, required: true },
    author: { type: String, required: true }, // Clerk User ID
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
