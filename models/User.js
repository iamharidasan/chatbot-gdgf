const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  sessionName: {
    type: String,
    required: true,
    unique: true,
  },
  chatFields: {
    name: { type: String },
    email: { type: String },
    category: { type: String },
    mobile: { type: String },
    secondaryCategory: { type: String },
    tiktokusername: { type: String },
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = User = mongoose.model("user", UserSchema)
