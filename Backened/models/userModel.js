const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const recycledItemSchema = require("./recycledItemSchema");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true
    },
    lastname: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,   
      required: true
    },
    recycledItems: {
      type: [recycledItemSchema],
      default: []
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });

const User = mongoose.model("User", userSchema);

module.exports = User;
