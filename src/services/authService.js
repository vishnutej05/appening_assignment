const User = require("../models/user_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendEmail = require("../utils/email");

class AuthService {
  async register(userData) {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const user = new User({
      ...userData,
      verificationToken,
    });

    await user.save();

    // Send verification email
    const verificationUrl = `${process.env.BASE_URL}/api/auth/verify-email/${verificationToken}`;
    await sendEmail(
      user.email,
      "Verify your email",
      `Click on this link to verify your gmail ${verificationUrl}`
    );

    return {
      message:
        "Registration successful. Please verify your email. \n Check your gmail inbox for the verificatoin link.",
    };
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    if (!user.isVerified) {
      throw new Error("Please verify your email first");
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return { token };
  }

  async verifyEmail(token) {
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      throw new Error("Invalid verification token");
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    return { message: "Email verified successfully" };
  }

  async getUsers() {
    return await User.find({});
  }
}

module.exports = new AuthService();
