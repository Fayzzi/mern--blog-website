const express = require("express");
const router = express.Router();
const { registerUser } = require("../Controllers/UserController");
router.post("/", registerUser);
module.exports = router;
