const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema({
  blogCategories: { type: Array, required: true },
  blogImage: { type: String, required: true },
  blogTitle: { type: String, required: true },
  blogSubtitle: { type: String, required: true },
  blogTime: { type: String, required: true },
  blog: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blog", BlogSchema);
