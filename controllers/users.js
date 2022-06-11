const res = require("express/lib/response");
const User = require("../models/user");

const getUsers = (_req, res, next) => {
  User.find()
    .then((users) => res.send(users))
    .catch(next);
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res
          .status(400)
          .send({ massage: "Пользователь по данному id не найдена" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(404).send({ massage: "Некорректные данные" });
      }
      return res.status(500).send({ massage: err.massage });
    });
};

const createUser = (req, res) => {
  User.countDocuments()
    .then((count) => User.create({ id: count, ...req.body }))
    .then((user) => {
      if (!user) {
        return res
          .status(400)
          .send({
            massage: "Переданы некорректные данные при создании пользователя",
          });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      return res.status(500).send({ massage: err.massage });
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
    .then((user) => {
      if (!user) {
        return res.status(400).send({
          massage: "Переданы некорректные данные при создании пользователя",
        });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
     if (err.name === "ValidationError") {
        return res.status(400).send({
          massage: "Переданы некорректные данные при создании пользователя",
        });
      }
      return res.status(500).send({ massage: err.massage });
    });
};
const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const owner = req.user._id;
  User.findByIdAndUpdate(owner, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(400).send({
          massage: "Переданы некорректные данные при создании пользователя",
        });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          massage: "Переданы некорректные данные при создании пользователя",
        });
      }
      return res.status(500).send({ massage: err.massage });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
