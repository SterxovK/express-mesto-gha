const User = require("../models/user");
const NotFoundError = require("../errors/NotFoundError");
const InvalidRequest = require("../errors/InvalidRequest");

const getUsers = (_req, res, next) => {
  User.find()
    .then((users) => res.send(users))
    .catch(next);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  return User.findById(userId)
    .orFail(() => {
      throw new NotFoundError("нет пользователя с таким id");
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new InvalidRequest("Некорректные данные"));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  User.countDocuments()
    .then((count) => User.create({ id: count, ...req.body }))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new InvalidRequest("ошибка валидации"));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  const owner = req.user._id;
  User.findByIdAndUpdate(
    owner,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new InvalidRequest("ошибка валидации"));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const owner = req.user._id;
  User.findByIdAndUpdate(owner, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new InvalidRequest("ошибка валидации"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
