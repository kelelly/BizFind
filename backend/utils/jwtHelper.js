// backend/utils/jwtHelper.js

const jwt = require("jsonwebtoken");

// Function to generate a JWT token
const generateToken = (userId, email) => {
  const payload = {
    userId,
    email,
    iss: "BizFindAPI", // Issuer
    aud: "BizFindClient", // Audience
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
};

// Function to verify the JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
      issuer: "BizFindAPI",
      audience: "BizFindClient",
    });
  } catch (err) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
