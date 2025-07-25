const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const BlogModel = model("Blog", blogSchema);

module.exports = BlogModel;
