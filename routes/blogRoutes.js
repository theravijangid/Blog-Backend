const express = require("express");
const router = express.Router();

//import controller
const {createPost} = require("../controllers/createPost");
const {getPost} = require("../controllers/getPost");

const {createComment} = require("../controllers/comment");
const {likepost , unlikepost} = require("../controllers/like");
 
//define API routes
router.post("/post/create",createPost);
router.get("/posts", getPost);
router.post("/comments/create", createComment);
router.post("/likes/like", likepost);
router.post("/likes/unlike", unlikepost);


module.exports = router;