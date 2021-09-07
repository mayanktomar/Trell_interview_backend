const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  fullname: {
    type: String,
  },
  password: {
    type: String,
  },
  interest1: {
    type: String,
  },
  interest2: {
    type: String,
  },
  interest3: {
    type: String,
  },
  location: {
    type: String,
  },
  city: {
    city: String,
  },
  country: {
    type: String,
  },
});

const User = (module.exports = mongoose.model("user", userSchema));

module.exports.createUser = (details, callback) => {
  User.create(details, callback);
};

module.exports.allUsers = (callback) => {
  User.find(callback);
};
