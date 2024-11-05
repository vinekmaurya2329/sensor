const mongoose = require("mongoose");
const uri = process.env.MONGODBURI;
mongoose
  .connect(uri)
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((error) => {
    console.log("error while connecting database");
  });

module.exports = mongoose; 