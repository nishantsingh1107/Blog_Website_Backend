const express = require("express");
const { authRouter } = require("./auth/routes");
const { usersRouter } = require("./users/routes");
const { blogsRouter } = require("./blogs/routes");
const { userAuthenticationMiddleware } = require("./middleware");
const { allBlogsRouter } = require("./all-blogs/routes");

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/all-blogs", allBlogsRouter);

apiRouter.use(userAuthenticationMiddleware); // authentication

// all the routes below this middleware are now (protected APIs)

apiRouter.use("/users", usersRouter);
apiRouter.use("/blogs", blogsRouter);

module.exports = { apiRouter };
