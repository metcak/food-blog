import { Schema, model } from "mongoose";

const AboutSchema = Schema(
  {
    name: { type: String, required: false },
    aboutTitle: { type: String, required: false },
    aboutImage: { type: String, required: false },
    aboutText: { type: String, required: false },
  },
  { timestamps: true }
);

export default model("About", AboutSchema);
