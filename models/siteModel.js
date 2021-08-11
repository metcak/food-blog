const mongoose = require("mongoose");

const SiteSchema = mongoose.Schema({
  logo: { type: String, required: "Bos birakilamaz" },
  homeLogoText: { type: String, required: "Bos birakilamaz" },
  aboutImage: { type: String, required: "Bos birakilamaz" },
  aboutText: { type: String, required: "Bos birakilamaz" },
});

module.exports = mongoose.model("Site", SiteSchema);
