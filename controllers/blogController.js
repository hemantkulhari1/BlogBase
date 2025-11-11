const Blog = require("../models/blogModel");

// CREATE BLOG
exports.createBlogController = async (req, res) => {
  try {
    const { title, excerpt, category, image, content, author } = req.body;

    // Check missing fields
    if (!title || !excerpt || !category || !image || !content || !author) {
      return res.status(400).send({
        success: false,
        message: "Please Provide ALL Fields",
      });
    }

    const blog = await Blog.create({
      title,
      excerpt,
      category,
      image,
      content,
      author, // Clerk user ID
    });

    return res.status(201).send({ success: true, blog });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error Creating Blog",
      error,
    });
  }
};


// GET ALL BLOGS
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Fetching Blogs", error });
  }
};

// GET BLOGS BY USER (Clerk user ID)
exports.userBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const blogs = await Blog.find({ author: id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Fetching User Blogs", error });
  }
};

// UPDATE BLOG (only owner allowed)
exports.updateBlogController = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ success: false, message: "Blog Not Found" });

    if (blog.author !== req.body.author) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json({ success: true, message: "Blog Updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Updating Blog", error });
  }
};

// DELETE BLOG (only owner allowed)
exports.deleteBlogController = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ success: false, message: "Blog Not Found" });

    if (blog.author !== req.body.author) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Blog Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Deleting Blog", error });
  }
};
