const mongoose = require("mongoose");

const AboutSchema = mongoose.Schema(
  {
    name: { type: String, required: false },
    aboutTitle: { type: String, required: false },
    aboutImage: { type: String, required: false },
    aboutText: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("About", AboutSchema);
