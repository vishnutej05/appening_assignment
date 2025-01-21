const Comment = require("../models/comment.model");

class CommentService {
  async createComment(commentData, userId) {
    const comment = new Comment({
      ...commentData,
      author: userId,
    });
    return await comment.save();
  }

  async deleteComment(commentId, userId) {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new Error("Comment not found");
    }

    if (comment.author.toString() !== userId.toString()) {
      throw new Error("Not authorized to delete this comment");
    }

    await Comment.deleteOne({ _id: commentId });
    return { message: "Comment deleted successfully" };
  }

  async getCommentsByBlog(blogId) {
    return await Comment.find({ blog: blogId })
      .populate("author", "email")
      .sort({ createdAt: -1 });
  }

  async getAllComments() {
    return await Comment.find()
      .populate("author", "email")
      .populate("blog", "title");
  }
}

module.exports = new CommentService();
