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
        }).sort({
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

// const getAllBlogs = async (req, res) => {
//     try {
//         const blogs = await BlogModel.find({}).populate("author", "email").sort({ createdAt: -1 });

//         return res.status(200).json({
//             isSuccess: true,
//             message: "All blogs fetched successfully!",
//             data: { blogs }
//         });
//     } catch (error) {
//         handleGenericAPIError("getAllBlogs", req, res, error);
//     }
// };

module.exports = { createBlog, getMyBlogs };
