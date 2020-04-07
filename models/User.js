const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  sessionName: {
    type: String,
    required: true,
    unique: true
  },
  chatFields: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.Now
  }
})

module.exports = User = mongoose.model("user", UserSchema)
