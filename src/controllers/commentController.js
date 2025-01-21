const commentService = require("../services/commentService");

class CommentController {
  async createComment(req, res) {
    try {
      const comment = await commentService.createComment(
        req.body,
        req.user.userId
      );
      res.status(201).json({
        status: "success",
        data: comment,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async deleteComment(req, res) {
    try {
      const result = await commentService.deleteComment(
        req.params.id,
        req.user.userId
      );
      res.json({
        status: "success",
        ...result,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getCommentsByBlog(req, res) {
    try {
      const comments = await commentService.getCommentsByBlog(
        req.params.blogId
      );
      res.json({
        status: "success",
        data: comments,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getAllComments(req, res) {
    try {
      const comments = await commentService.getAllComments();
      res.json({
        status: "success",
        data: comments,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = new CommentController();
