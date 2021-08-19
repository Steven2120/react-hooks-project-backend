const { checkIsStrongPassword } = require("../../utils/authMethods");

function checkIsStrongPasswordFunc(req, res, next) {
  const { errorObj } = res.locals;

  next();
}

module.exports = checkIsStrongPasswordFunc;
