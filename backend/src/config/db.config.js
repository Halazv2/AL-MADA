const db = require("../models/auth");
const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  db.mongoose
    .connect(`mongodb://${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connect to MongoDB. Happy Cruding");
    })
    .catch((err) => {
      console.error("Connection error", err);
      process.exit();
    });
};

module.exports = connectDB;
