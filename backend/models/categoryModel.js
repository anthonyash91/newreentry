const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    englishTitle: { type: String, required: true },
    spanishTitle: { type: String },
    categoryImage: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
