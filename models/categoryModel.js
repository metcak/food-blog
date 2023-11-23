import { Schema, model } from "mongoose";

const CategorySchema = Schema(
  {
    categoryName: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("Category", CategorySchema);
