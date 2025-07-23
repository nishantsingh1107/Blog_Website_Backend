const express = require("express");
const { sendUserBasicInfoController, uploadProfilePhoto, editProfile } = require("./controllers");
const { cloudinary } = require("../../../config/cloudinary");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const usersRouter = express.Router();

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "profile-photos",
        allowed_formats: ["jpg", "jpeg", "png"],
        transformation: [{ width: 300, height: 300, crop: "limit" }],
    },
});
const upload = multer({ storage });

usersRouter.get("/", sendUserBasicInfoController);
usersRouter.post("/profile-photo", upload.single("photo"), uploadProfilePhoto);
usersRouter.put("/", editProfile);

module.exports = { usersRouter };
