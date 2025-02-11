const mongoose = require ("mongoose");

const womanProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: ["RTW", "Unstitched", "WEST", "Sleepover", "Modest"],
    required: true,
  },
  description: { type: String },
  imageId: { type: mongoose.Schema.Types.ObjectId, ref: "uploads.files" }, 
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("WomanProduct", womanProductSchema);