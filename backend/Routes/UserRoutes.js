const express = require("express");
const router = express.Router();
const {
  registerUser,
  userActivation,
  getuser,
  loginUser,
  updateUSer,
  logoutUser,
} = require("../Controllers/UserController");
const { upload } = require("./../multer");
const { isAuthenticated } = require("../middlewares/IsAuthenticated");
router.post("/signup", upload.single("file"), registerUser);
router.post("/activation/:activationtoken", userActivation);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/get-user", isAuthenticated, getuser);
router.put("/update-user", isAuthenticated, upload.single("file"), updateUSer);

module.exports = router;
