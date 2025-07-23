const sendUserBasicInfoController = (req, res) => {
    const userInfo = req.user;

    res.status(200).json({
        isSuccess: true,
        message: "User is valid!",
        data: {
            user: userInfo,
        },
    });
};

const { UserModel } = require("../../../models/userSchema");

const uploadProfilePhoto = async (req, res) => {
    try {
        if (!req.file || !req.file.path) {
            return res.status(400).json({ isSuccess: false, message: "No file uploaded" });
        }
        const userId = req.user._id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ isSuccess: false, message: "User not found" });
        }
        user.imageUrl = req.file.path; // Cloudinary URL
        await user.save();
        res.json({ isSuccess: true, message: "Profile photo updated", data: { imageUrl: user.imageUrl } });
    } catch (err) {
        res.status(500).json({ isSuccess: false, message: "Server error" });
    }
};

const editProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, gender } = req.body;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ isSuccess: false, message: "User not found" });
        }
        if (name !== undefined) user.name = name;
        if (gender !== undefined) user.gender = gender;
        await user.save();
        res.json({ isSuccess: true, message: "Profile updated successfully!", data: { name: user.name, gender: user.gender } });
    } catch (err) {
        res.status(500).json({ isSuccess: false, message: "Server error" });
    }
};

module.exports = { sendUserBasicInfoController, uploadProfilePhoto, editProfile };
