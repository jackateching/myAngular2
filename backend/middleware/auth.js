const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  // const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    let decoded = jwt.verify(token, config.TOKEN_KEY)
    req.user = decoded;
    req.token = token;
    // console.log(req.user);
    next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

const isEmployee = async (req, res, next) => {
  if (req.user.level === "employee" || req.user.level === "admin") {
    next();
  } else {
    return res.status(401).send("Unauthorized!");
  }
};

const isAdmin = async (req, res, next) => {
  // console.log(req.user.level);
  if (req.user.level === "admin") {
    next();
  } else {
    return res.status(401).send("Unauthorized!");
  }
}

module.exports = {verifyToken, isEmployee, isAdmin};