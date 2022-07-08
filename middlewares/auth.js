const jwt = require('jsonwebtoken');
const AuthError = require('../Error/AuthError');

const auth = (req, res, next) => {
  const { cookies } = req;
  const token = cookies.jwt;
  const { NODE_ENV, JWT_SECRET } = process.env;
  if (!token) {
    throw new AuthError('Необходима авторизация');
  }
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-key',
    );
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
  }
  req.user = payload;
  next();
  return true;
};
module.exports = auth;
