const blogService = require("../services/blog_Service");
const User = require("../models/user_model");
const Blog = require("../models/blog_model");
class BlogController {
  async createBlog(req, res) {
    try {
      const Useremail = await User.findById(req.user.userId);
      const { _id, email } = Useremail;
      // console.log(_id);
      const blog = await blogService.createBlog(req.body, { _id, email });
      res.status(201).json({
        status: "success",
        data: blog,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async assignEditor(req, res) {
    try {
      const { blogId, editorId } = req.body;
      const blog = await blogService.assignEditor(blogId, editorId);
      res.json({
        status: "success",
        data: blog,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getBlogs(req, res) {
    try {
      const blogs = await blogService.getBlogs();
      res.json({
        status: "success",
        data: blogs,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Failed to fetch blogs",
      });
    }
  }

  async editBlog(req, res) {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({
          status: "error",
          message: "Blog not found",
        });
      }

      // If user is admin, allow editing any blog
      if (req.user.role === "admin") {
        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;
        await blog.save();

        return res.json({
          status: "success",
          data: blog,
        });
      }

      // If user is editor, check if blog is assigned to them
      if (req.user.role === "editor") {
        if (
          !blog.assignedEditor ||
          blog.assignedEditor.toString() !== req.user.userId
        ) {
          return res.status(403).json({
            status: "error",
            message: "Not authorized: This blog is not assigned to you",
          });
        }

        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;
        await blog.save();

        return res.json({
          status: "success",
          data: blog,
        });
      }

      // If neither admin nor editor
      return res.status(403).json({
        status: "error",
        message: "Not authorized: Only admins and editors can edit blogs",
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = new BlogController();
