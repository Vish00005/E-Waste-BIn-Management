const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },    
    lastname:{  type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone:{ type: Number, required: true },
    list:[{ type: String }]
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });

const User = mongoose.model("User", userSchema);

module.exports = User;
