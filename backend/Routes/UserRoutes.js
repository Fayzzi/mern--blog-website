const express = require("express");
const router = express.Router();
const {
  registerUser,
  userActivation,
  getuser,
  loginUser,
} = require("../Controllers/UserController");
const { isAuthenticated } = require("../middlewares/IsAuthenticated");
router.post("/signup", registerUser);
router.post("/activation/:activationtoken", userActivation);
router.post("/login", loginUser);
router.get("/get-user", isAuthenticated, getuser);

module.exports = router;
