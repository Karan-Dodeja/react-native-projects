const express = require("express");
const {
  registerController,
  loginController,
  updateUserController,
  requireSignIn,
} = require("../controllers/userController");
//object
const router = express.Router();

// Register Route || POST
router.post("/register", registerController);

// Login Route || POST
router.post("/login", loginController);

// update
router.put("/update-user", requireSignIn, updateUserController);

module.exports = router;
