const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const errorMidleware = require("./Utils/error");
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static("uploads"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
//reading images
app.use("/", express.static("uplaods"));
app.use(bodyParser.urlencoded({ extended: true }));
//env file getter
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}
//routes
const userRoutes = require("./Routes/UserRoutes");
const GoogelAuth = require("./Controllers/GoogleAuthController");
app.use("/api/v2/user", userRoutes);
app.use("/api/v2/auth", GoogelAuth);

//Handleing errors
app.use(errorMidleware);
module.exports = app;
