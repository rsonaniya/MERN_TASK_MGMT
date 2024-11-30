module.exports = function (message, code) {
  const err = new Error();
  err.message = message;
  err.statusCode = code;
  return err;
};
