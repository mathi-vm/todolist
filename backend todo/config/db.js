const mongoose = require("mongoose");
require("dotenv").config();

const ConnectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URL);

    console.log("Connected to mongodb successfully");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};
module.exports = ConnectDB;
