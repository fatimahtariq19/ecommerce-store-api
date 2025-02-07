const express = require("express");
const {
    register,
    login,
    logout,
    getProfile,
    updateProfile,
    resetPasswordRequest,
    verifyResetToken,
    resetPassword,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", authMiddleware, getProfile);
router.put("/update-profile", authMiddleware, updateProfile);
router.post("/reset-password", resetPasswordRequest);
router.post("/verify-token", verifyResetToken);
router.post("/new-password", resetPassword);

module.exports = router;
