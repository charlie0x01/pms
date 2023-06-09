const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

async function authMiddleware(req, res, next) {
  try {
    // token from header
    const authHeader = req.headers.authorization;

    // Check if the header exists
    if (authHeader) {
      // Split the header value into parts
      const [authType, accessToken] = authHeader.split(" ");

      // Check if the authorization type is Bearer
      if (authType === "Bearer") {
        // Verify token
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        console.log(decoded);
        const [user, _] = await User.findByUserId(decoded.email.user_id);
        console.log("out", user, user.length > 0);
        if (user.length > 0) {
          console.log("in ", user);
          next();
        }
      }
    } else {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Check if no token
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
}

module.exports = authMiddleware;
