const express = require("express");
const { getAllBlogs } = require("./controllers");

const allBlogsRouter = express.Router();

allBlogsRouter.get("/", getAllBlogs);

module.exports = { allBlogsRouter };
