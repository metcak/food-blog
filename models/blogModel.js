const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");

const BlogSchema = mongoose.Schema({
  blogCategories: { type: Array, required: true },
  blogImage: { type: String, required: true },
  blogTitle: { type: String, required: true },
  blogSubtitle: { type: String, required: true },
  blogTime: { type: String, required: true },
  blog: { type: String, required: true },
  date: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  slug: { type: String, required: true, unique: true}
});

BlogSchema.pre("validate", function(next) {
  if(this.blogTitle) {
    this.slug = slugify(this.blogTitle, {lower: true, strict: true })
  }
  next()
})

module.exports = mongoose.model("Blog", BlogSchema);
