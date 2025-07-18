const BlogModel = require("../../../models/blogSchema");
const { handleGenericAPIError } = require("../../../utils/controllerHelpers");

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await BlogModel.find({}).populate("author", "email").sort({ createdAt: -1 });

        return res.status(200).json({
            isSuccess: true,
            message: "All blogs fetched successfully!",
            data: { blogs }
        });
    } catch (error) {
        handleGenericAPIError("getAllBlogs", req, res, error);
    }
};

module.exports = { getAllBlogs };