const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../Error/NotFoundError');
const CastError = require('../Error/CastError');
const ConflictEmailError = require('../Error/ConflictEmailError');
const NotValidError = require('../Error/NotFoundError');

const { JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      // вернём токен
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
        .end();
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  return User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.status(200).send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new CastError('Некорректный id пользователя'));
      } else {
        next(error);
      }
    });
};

const getUserMe = (req, res, next) => {
  const { userId } = req.user._id;
  return User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.status(200).send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new CastError('Некорректный id пользователя'));
      } else {
        next(error);
      }
    });
};

const createUser = async (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashPassword,
      name,
      about,
      avatar,
    });
    res.status(201).send({
      user: {
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictEmailError('Такой Email уже существует'));
    } else {
      next(err);
    }
  }
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const owner = req.user._id;
  User.findByIdAndUpdate(
    owner,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.status(200).send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'NotValidError') {
        next(new NotValidError('Некорректные данные'));
      } else {
        next(error);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const owner = req.user._id;
  User.findByIdAndUpdate(owner, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.status(200).send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new CastError('Некорректный id пользователя'));
      } else {
        next(error);
      }
    });
};

module.exports = {
  login,
  getUsers,
  getUser,
  getUserMe,
  createUser,
  updateUser,
  updateAvatar,
};
