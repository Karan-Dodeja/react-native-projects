const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/userController");
//object
const router = express.Router();

// Register Route || POST
router.post("/register", registerController);

// Login Route || POST
router.post("/login", loginController);

module.exports = router;
