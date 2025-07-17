const Blog = require("../../../models/blogSchema");
const { handleGenericAPIError } = require("../../../utils/controllerHelpers");

const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user._id;

        if (!title || !content) {
            return res.status(400).json({ isSuccess: false, message: "Title and content are required!" });
        }

        const newBlog = await Blog.create({
            title,
            content,
            author: userId,
        });

        res.status(201).json({ isSuccess: true, message: "Blog created successfully!", data: newBlog });
    } catch (err) {
        handleGenericAPIError("createBlog", req, res, err);
    }
};

module.exports = { createBlog };
