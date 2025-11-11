const express = require("express");
const {
  createBlogController,
  getAllBlogsController,
  userBlogController,
  updateBlogController,
  deleteBlogController,
} = require("../controllers/blogController");

const router = express.Router();

router.post("/create-blog", createBlogController);
router.get("/all-blog", getAllBlogsController);
router.get("/user-blog/:id", userBlogController);
router.put("/update-blog/:id", updateBlogController);
router.delete("/delete-blog/:id", deleteBlogController);

module.exports = router;
