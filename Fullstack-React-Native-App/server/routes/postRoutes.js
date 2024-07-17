const express = require("express");
const { requireSignIn } = require("../controllers/userController");
const { createPostCOntroller } = require("../controllers/postController");
//router
const router = express.Router();

//create post
router.post("/create-post", requireSignIn, createPostCOntroller);

//export
module.exports = router;
