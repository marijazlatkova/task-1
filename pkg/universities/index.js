const mongoose = require("mongoose");

const univeritySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  faculties: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "faculty"
    }
  ],
});

module.exports = mongoose.model("university", univeritySchema, "universities");