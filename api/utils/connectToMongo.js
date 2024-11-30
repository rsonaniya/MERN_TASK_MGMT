const mongoose = require("mongoose");

module.exports = async function connectToMongo() {
  try {
    await mongoose.connect(process.env.DB);
    console.log("Connected to db");
  } catch (error) {
    console.log(error);
  }
};
