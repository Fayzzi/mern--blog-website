const express = require("express");
const app = require("./app");
const mongoose = require("mongoose");
//uncaught exception
process.on("uncaughtException", (err) => {
  console.log(err.message);
  console.log("Shutting down the server ...");
});
const server = app.listen(3000, () => {
  console.log("server listening on port", 3000);
});
//process env
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}
//database connection
mongoose.connect(process.env.MONGOOSE).then((data) => {
  console.log("Connected to database:", data.connection.host);
});
//unhandled rejection
process.on("unhandledRejection", (err) => {
  console.log("Unhandeled rejection", err.message);
  server.close(() => {
    process.exit(1);
  });
});
