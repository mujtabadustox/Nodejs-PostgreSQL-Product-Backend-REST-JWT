const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Invalid Token" });
  }

  const xyz = jwt.verify(token, process.env.SECRET_KEY);

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Token" });
    }
    if (decoded) {
      req = req;
      req.user = decoded;
    }
    next();
  });
};

module.exports = auth;
