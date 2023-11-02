const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  university: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "university",
  },
});

module.exports = mongoose.model("faculty", facultySchema, "faculties");