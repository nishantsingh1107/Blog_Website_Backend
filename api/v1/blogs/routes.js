const express = require("express");
const { createBlog } = require("./controllers");

const blogsRouter = express.Router();

blogsRouter.post("/create", createBlog);

module.exports = { blogsRouter };
