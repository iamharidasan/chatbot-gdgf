const mongoose = require("mongoose")

const AccountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
})

module.exports = Account = mongoose.model("accounts", AccountSchema)
