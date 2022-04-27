const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    "mongodb+srv://dinesh-sharma:dinesh@cluster0.pm3c3.mongodb.net/pet-boarding-app?retryWrites=true&w=majority"
  );
};
