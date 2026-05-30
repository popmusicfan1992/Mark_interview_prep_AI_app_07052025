const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
    });

    // Auto-seed default interview data
    try {
      const { seedDefaultData } = require("../utils/seeder");
      await seedDefaultData(user._id);
    } catch (seedError) {
      console.error("Failed to seed default data for registered user:", seedError);
    }

    // Return user data with JWT
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Return user data with JWT
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private (Requires JWT)
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Login/Register using Google ID Token
// @route   POST /api/auth/google-login
// @access  Public
const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: "Google ID Token is required" });
    }

    // Verify token using Google tokeninfo API
    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
    if (!response.ok) {
      return res.status(400).json({ message: "Invalid Google ID Token" });
    }

    const payload = await response.json();
    const { email, name, picture, sub } = payload;

    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create user automatically
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(sub + process.env.JWT_SECRET, salt); // Random secure password

      user = await User.create({
        name,
        email,
        password: hashedPassword,
        profileImageUrl: picture || "",
      });

      // Auto-seed default interview data for new user
      try {
        const { seedDefaultData } = require("../utils/seeder");
        await seedDefaultData(user._id);
      } catch (seedError) {
        console.error("Failed to seed default data for registered Google user:", seedError);
      }
    } else {
      // If user exists, synchronize their Google profile details (name and avatar)
      let isUpdated = false;
      if (picture && user.profileImageUrl !== picture) {
        user.profileImageUrl = picture;
        isUpdated = true;
      }
      if (name && user.name !== name) {
        user.name = name;
        isUpdated = true;
      }
      if (isUpdated) {
        await user.save();
      }
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("googleLogin error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile, googleLogin };
