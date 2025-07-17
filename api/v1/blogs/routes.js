const express = require("express");
const { createBlog, getMyBlogs, getAllBlogs } = require("./controllers");

const blogsRouter = express.Router();

blogsRouter.post("/create", createBlog);
blogsRouter.get("/my-blogs", getMyBlogs);
blogsRouter.get("/all-blogs", getAllBlogs);

module.exports = { blogsRouter };
