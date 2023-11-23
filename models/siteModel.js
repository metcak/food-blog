import { Schema, model } from "mongoose";

const SiteSchema = Schema({
  logo: { type: String, required: "Bos birakilamaz" },
  homeLogoText: { type: String, required: "Bos birakilamaz" },
  aboutImage: { type: String, required: "Bos birakilamaz" },
  aboutText: { type: String, required: "Bos birakilamaz" },
});

export default model("Site", SiteSchema);
