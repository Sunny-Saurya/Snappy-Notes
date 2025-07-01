const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  // Extract the Authorization header
  const authHeader = req.header("Authorization"); // Correctly access headers
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  // If no token is provided, deny access
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided" });
  }

  // Verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" }); // Handle verification errors
    }

    // Attach the decoded user to the request object
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  });
}

module.exports = {
  authenticateToken, // Ensure consistent export naming
};
