const { handleGenericAPIError } = require("../../utils/controllerHelpers");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../../models/userSchema");

const userAuthenticationMiddleware = async (req, res, next) => {
    console.log("--> inside userAuthenticationMiddleware");
    try {
        const { authorization } = req.cookies;
        console.log("--> authorization", authorization);
        if (!authorization) {
            return res.status(401).json({ isSuccess: false, message: "Token not found!" });
        }
        jwt.verify(authorization, process.env.JWT_SECRET, async function (err, decodedData) {
            if (err) {
                return res.status(401).json({
                    isSuccess: false,
                    message: "Invalid token!",
                    data: {},
                });
            } else {
                const user = await UserModel.findById(decodedData._id);
                if (!user) {
                    return res.status(401).json({ isSuccess: false, message: "User not found!" });
                }
                req.user = user;
                next();
            }
        });
    } catch (err) {
        handleGenericAPIError("userAuthenticationMiddleware", req, res, err);
    }
};

module.exports = { userAuthenticationMiddleware };
