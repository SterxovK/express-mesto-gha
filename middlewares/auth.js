const jwt = require('jsonwebtoken');
const ForbiddenError = require('../Error/ForbiddenError');
const AuthError = require('../Error/AuthError');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    next(new AuthError({ messege: 'Необходима авторизация' }));
  }
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new ForbiddenError({ messege: 'Необходима авторизация' }));
  }
  req.user = payload;
  next();
  return true;
};
