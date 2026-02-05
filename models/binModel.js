const mongoose = require("mongoose");

const binSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Long:{ type: String, required: true },
    Lat:{ type: String, required: true },
    Storage:{ type: Number, required: true },
    Type:{ type: String, required: true },
  },
  { timestamps: true},
);

const Bin = mongoose.model("bin", binSchema);

module.exports = Bin
;
