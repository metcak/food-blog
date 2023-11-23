import { Schema, model } from "mongoose";
import slugify from "slugify";

const BlogSchema = Schema({
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

export default model("Blog", BlogSchema);
