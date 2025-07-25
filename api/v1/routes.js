const express = require("express");
const { authRouter } = require("./auth/routes");
const { usersRouter } = require("./users/routes");
const { blogsRouter } = require("./blogs/routes");
const { userAuthenticationMiddleware } = require("./middleware");
const { allBlogsRouter } = require("./all-blogs/routes");
const { generateRouter } = require("./Generate/routes");

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/all-blogs", allBlogsRouter);
apiRouter.use("/generate-content", generateRouter);

apiRouter.use(userAuthenticationMiddleware);


apiRouter.use("/users", usersRouter);
apiRouter.use("/blogs", blogsRouter);

module.exports = { apiRouter };
