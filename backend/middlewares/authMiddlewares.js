const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "unauthorized access" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Set user in request object
    req.user = decoded.user;

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
}

module.exports = authMiddleware;
