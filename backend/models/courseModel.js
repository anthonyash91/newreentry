const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    englishTitle: { type: String, required: true },
    spanishTitle: { type: String },
    englishLink: { type: String, required: true },
    spanishLink: { type: String },
    category: { type: String, required: true },
    contentType: { type: String, required: true },
    active: { type: Boolean, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
