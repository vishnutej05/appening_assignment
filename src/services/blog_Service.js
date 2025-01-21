const Blog = require("../models/blog_model");

class BlogService {
  async createBlog(blogData, user) {
    // console.log(user);
    try {
      const blog = new Blog({
        ...blogData,
        authorId: user._id,
        authorEmail: user.email,
      });
      return await blog.save();
    } catch (error) {
      throw new Error("Failed to create blog");
    }
  }

  async assignEditor(blogId, editorId) {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      throw new Error("Blog not found");
    }

    if (blog.assignedEditor) {
      throw new Error("Blog already assigned to an editor");
    }

    blog.assignedEditor = editorId;
    return await blog.save();
  }

  async getBlogs() {
    return await Blog.find().populate("assignedEditor");
  }
}

module.exports = new BlogService();
