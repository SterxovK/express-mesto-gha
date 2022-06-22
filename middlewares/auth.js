const jwt = require('jsonwebtoken');
const AuthError = require('../Error/AuthError');
const ForbiddenError = require('../Error/ForbiddenError');

const auth = (req, res, next) => {
  const { cookies } = req;
  const token = cookies.jwt;
  if (!token) {
    throw new AuthError('Нет пользователя с таким id');
  }
  let payload;
  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    next(new ForbiddenError('jwt token is not valid'));
  }
  req.user = payload;
  next();
  return true;
};
module.exports = auth;
