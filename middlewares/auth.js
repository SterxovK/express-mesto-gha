const jwt = require('jsonwebtoken');
const { AuthError } = require('../Error/AuthError');

// const { JWT_SECRET } = 'secret-key';

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { cookies } = req;
  console.log(req.cookies);
  if (!cookies) {
    return res.status(403).send({ message: 'Необходима авторизация' });
  }
  const token = cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    next(new AuthError({ message: 'Необходима авторизация' }));
  }
  req.user = payload;
  next();
  return true;
};
module.exports = auth;
