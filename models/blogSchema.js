const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Blog title is required"],
        },
        content: {
            type: String,
            required: [true, "Blog content is required"],
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User", // Or another model name if different
            required: true,
        },
    },
    { timestamps: true }
);

const BlogModel = model("Blog", blogSchema);

module.exports = BlogModel;

