const jwt = require("jsonwebtoken");
const { queryDatabase } = require("../controllers/mainControllers");

const authenticateEmployer = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send("Employer is unauthenticated");
  }
  const token = authorization.split(" ")[1];

  try {
    const results = await queryDatabase(
      "SELECT * FROM `token_blacklist` WHERE token = ?",
      [token]
    );
    if (results.length > 0) {
      return res.status(401).send("Token is blacklisted");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.tokenData = payload.employer;
    next();
  } catch (error) {
    return res.status(401).send("Employer is unauthenticated");
  }
};

const authenticateFreelancer = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send("Freelancer is unauthenticated");
  }
  const token = authorization.split(" ")[1];
  try {
    const results = await queryDatabase(
      "SELECT * FROM `token_blacklist` WHERE token = ?",
      [token]
    );
    if (results.length > 0) {
      return res.status(401).send("Token is blacklisted");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.tokenData = payload.freelancer;
    next();
  } catch (error) {
    return res.status(401).send("Freelancer is unauthenticated");
  }
};

module.exports = { authenticateEmployer, authenticateFreelancer };
