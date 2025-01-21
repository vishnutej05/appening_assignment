const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const { auth, checkRole } = require("../middlewares/auth.middleware");

router.post("/", auth, checkRole(["admin"]), blogController.createBlog);
router.post(
  "/assign-editor",
  auth,
  checkRole(["admin"]),
  blogController.assignEditor
);
router.get("/", blogController.getBlogs);
router.put('/:id', auth, checkRole(['admin', 'editor']), blogController.editBlog);

module.exports = router;
