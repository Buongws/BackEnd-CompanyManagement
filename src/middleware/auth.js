import pkg from "jsonwebtoken";

const { verify } = pkg;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token is missing" });
  }

  verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token has expired" });
      } else if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      } else {
        return res.status(401).json({ message: "Authentication failed" });
      }
    }

    req.user = user;
    next();
  });
};

export default authenticateToken;
