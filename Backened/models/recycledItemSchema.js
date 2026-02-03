const mongoose = require("mongoose");

const recycledItemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ["mobile", "laptop", "tv", "battery", "charger", "other"],
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    estimatedPrice: {
      type: Number,
      min: 0
    },
    pointsEarned: {
      type: Number,
      required: true,
      min: 0
    },
    condition: {
      type: String,
      enum: ["working", "damaged", "dead"],
      default: "damaged"
    },
    recycledAt: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false }
);

module.exports = recycledItemSchema; 