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
const admin = require("./Controllers/AdminController");

app.use("/api/v2/user", userRoutes);
app.use("/api/v2/auth", GoogelAuth);
app.use("/api/v2/admin", admin);

//Handleing errors
app.use(errorMidleware);
module.exports = app;
