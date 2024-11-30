const errorHandler = require("../utils/errorHandler.js");
const jwt = require("jsonwebtoken");
function verifyToken(token, req, next) {
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler("You are not authenticated", 401));
    req.userId = user;
    next();
  });
}
module.exports = function (req, res, next) {
  const { token } = req.cookies;
  if (!token) {
    return next(
      errorHandler("You are not logged in, PLease login to contuinue", 401)
    );
  }
  verifyToken(token, req, next);
};
