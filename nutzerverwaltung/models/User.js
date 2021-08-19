const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  adress: {
      street: String,
      cp: String,
      town: String,
      country: String
  },
  firm: String,
  name: String,
  surname: String,
  creationDate: Date,
  userId: String
})

module.exports = mongoose.model("User", userSchema)