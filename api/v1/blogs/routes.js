const express = require("express");
const { createBlog, getMyBlogs, deleteBlog, editBlog, getBlogById } = require("./controllers");

const blogsRouter = express.Router();

blogsRouter.post("/create", createBlog);
blogsRouter.get("/my-blogs", getMyBlogs);
blogsRouter.get("/:id", getBlogById);
blogsRouter.delete("/:id", deleteBlog);
blogsRouter.put("/:id", editBlog);

module.exports = { blogsRouter };
