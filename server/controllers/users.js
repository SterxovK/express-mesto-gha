const User = require("../models/user");

const usersController = (_req, res) => {
  User.find()
    .then((data) => res.send(data))
    .catch((_) => res.status(404).sand({ massage: "No file" }));
};

const userController = (req, res) => {
  const { id } = req.params;
  User.findOne({ id })
    .then((data) => {
      if (!data) {
        throw new Error();
      }
      res.send(data);
    })
    .catch((_) => res.status(404).send({ massage: "No user" }));
};

const createUser = (req, res) => {
  User.countDocuments()
    .then((count) => User.create({ id: count, ...req.body }))
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send(err));
};

const updateUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
}
const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports = {
  usersController,
  userController,
  createUser,
  updateUser,
  updateAvatar,
};
