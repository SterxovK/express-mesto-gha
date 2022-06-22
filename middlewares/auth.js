const jwt = require('jsonwebtoken');
// const { AuthError } = require('../Error/AuthError');

// const { JWT_SECRET } = 'secret-key';

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  // eslint-disable-next-line prefer-destructuring
  const cookies = req.cookies;
  if (!cookies) {
    return res.status(401).send({ messege: 'авторизация неуспешна' });
  }
  const token = cookies.jwt;
  if (!token) {
    return res.status(401).send({ messege: 'авторизация неуспешна' });
  }
  let payload;
  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    console.log('fer');
    return res.status(403).send({ messege: 'jwt token is not valid' });
  }
  req.user = payload;
  next();
  // return true;
};
module.exports = auth;
