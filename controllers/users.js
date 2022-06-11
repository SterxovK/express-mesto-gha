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
    if (!user) throw error;
    res.send({data: user })
  })
  .catch((err) => {
    if(err.name === "CastError") {
      return res.status(404).send({massage: "Пользователь по данному id не найден"})
    } else if (err.name ==="ValidationError") {
       return res
         .status(400)
         .send({
           massage: "Переданы некорректные данные при создании пользователя",
         });
    }
    return res.status(500).send({massage: err.massage});
  })
};

const createUser = (req, res) => {
  User.countDocuments()
    .then((count) => User.create({ id: count, ...req.body }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(404)
          .send({ massage: "Пользователь по данному id не найден" });
      } else if (err.name === "ValidationError") {
        return res.status(400).send({
          massage: "Переданы некорректные данные при создании пользователя",
        });
      }
      return res.status(500).send({ massage: err.massage });
    });
};

const updateUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(404)
          .send({ massage: "Пользователь по данному id не найден" });
      } else if (err.name === "ValidationError") {
        return res.status(400).send({
          massage: "Переданы некорректные данные при создании пользователя",
        });
      }
      return res.status(500).send({ massage: err.massage });
    });
};
const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(404)
          .send({ massage: "Пользователь по данному id не найден" });
      } else if (err.name === "ValidationError") {
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
