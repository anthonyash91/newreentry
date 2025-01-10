const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    englishTitle: { type: String, requird: true },
    spanishTitle: { type: String },
    categoryImage: { type: String, requird: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
