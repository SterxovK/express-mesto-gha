const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const bodyParser = require('body-parser');
const cors = require('cors');
const { login, createUser } = require('./controllers/users');
const error = require('./middlewares/error');
const NotFoundError = require('./Error/NotFoundError');
const auth = require('./middlewares/auth');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();

console.log(process.env);

const { PORT = 3000 } = process.env;
const app = express();

const REGEX = /^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/g;
app.use(cookieParser());
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'https://domainname.mesto.auth.nomoredomains.xyz',
    credentials: true,
  }),
);

app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom((value, helpers) => {
        if (REGEX.test(value)) {
          return value;
        }
        return helpers.message('Некорректная ссылка');
      }),
    }),
  }),
  createUser,
);

app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use((req, res, next) => {
  try {
    throw new NotFoundError('Страница не найдена');
  } catch (err) {
    next(err);
  }
});

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(error);

app.listen(PORT, () => {
  console.log(`Listening port ${PORT}`);
});
