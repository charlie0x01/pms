const jwt = require("jsonwebtoken");
const { findByUserId } = require("../models/user.model");

async function authMiddleware(req, res, next) {
  // Get token from header
  const token = req.header("x-Authorization").split(" ")[1];

  // Check if no token
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "unauthorized access" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user by ID from the decoded token
    const user = await findByUserId(decoded.userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Set user in request object
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
}

module.exports = authMiddleware;
