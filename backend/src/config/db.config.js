const mongoose = require("mongoose");
const connectDB = async () => {
  mongoose.set("strictQuery", true);
  console.log(process.env.DB_PORT + " " + process.env.DB);
  try {
    await mongoose.connect(`mongodb://${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB}`);
    console.log("Successfully connect to MongoDB.".rainbow.bold);
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};
module.exports = connectDB;
