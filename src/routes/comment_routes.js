const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const { auth } = require("../middlewares/auth.middleware");

router.post("/", auth, commentController.createComment);
router.delete("/:id", auth, commentController.deleteComment);
router.get("/blog/:blogId", commentController.getCommentsByBlog);
router.get("/", commentController.getAllComments);

module.exports = router;
