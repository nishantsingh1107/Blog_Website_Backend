const BlogModel = require("../../../models/blogSchema");
const { handleGenericAPIError } = require("../../../utils/controllerHelpers");

const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user._id;

        if (!title || !content) {
            return res.status(400).json({
                isSuccess: false,
                message: "Title and content are required!",
                data: {},
            });
        }

        const newBlog = await BlogModel.create({
            title,
            content,
            author: userId,
        });

        res.status(201).json({
            isSuccess: true,
            message: "Blog created successfully!",
            data: newBlog,
        });
    } catch (err) {
        handleGenericAPIError("createBlog", req, res, err);
    }
};

const getMyBlogs = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.status(401).json({
                isSuccess: false,
                message: "Unauthorized",
                data: {},
            });
        }
        const blogs = await BlogModel.find({
            author: userId
        }).populate('author', 'name email').sort({
            createdAt: -1
        });
        return res.status(200).json({
            isSuccess: true,
            message: "Blogs fetched successfully!",
            data: { blogs }
        });
    } catch (error) {
        handleGenericAPIError("getAllBlogs", req, res, error);
    }
};

const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const userId = req.user._id;
        const blog = await BlogModel.findById(blogId);
        if (!blog) {
            return res.status(404).json({ isSuccess: false, message: "Blog not found" });
        }
        if (blog.author.toString() !== userId.toString()) {
            return res.status(403).json({ isSuccess: false, message: "Not authorized" });
        }
        await blog.deleteOne();
        res.json({ isSuccess: true, message: "Blog deleted" });
    } catch (err) {
        handleGenericAPIError("deleteBlog", req, res, err);
    }
};

const editBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const userId = req.user._id;
        const { title, content } = req.body;
        const blog = await BlogModel.findById(blogId);
        if (!blog) {
            return res.status(404).json({ isSuccess: false, message: "Blog not found" });
        }
        if (blog.author.toString() !== userId.toString()) {
            return res.status(403).json({ isSuccess: false, message: "Not authorized" });
        }
        blog.title = title;
        blog.content = content;
        await blog.save();
        res.json({ isSuccess: true, message: "Blog updated successfully!", data: blog });
    } catch (err) {
        handleGenericAPIError("editBlog", req, res, err);
    }
};

const getBlogById = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await BlogModel.findById(blogId).populate('author', 'name email');
        if (!blog) {
            return res.status(404).json({ isSuccess: false, message: "Blog not found" });
        }
        res.json({ isSuccess: true, data: { blog } });
    } catch (err) {
        handleGenericAPIError("getBlogById", req, res, err);
    }
};

module.exports = { createBlog, getMyBlogs, deleteBlog, editBlog, getBlogById };
