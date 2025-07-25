const express = require("express");
const { generateContentController } = require("./controller");

const generateRouter = express.Router();

generateRouter.get("/", generateContentController);

module.exports = { generateRouter }; 