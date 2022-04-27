const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    capacity: { type: Number, required: true },
    cost_per_day: { type: Number, required: true },
    verified: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("pet", petSchema);
