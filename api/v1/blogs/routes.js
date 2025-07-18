const express = require("express");
const { createBlog, getMyBlogs } = require("./controllers");

const blogsRouter = express.Router();

blogsRouter.post("/create", createBlog);
blogsRouter.get("/my-blogs", getMyBlogs);

module.exports = { blogsRouter };
