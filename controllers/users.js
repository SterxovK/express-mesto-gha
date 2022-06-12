const User = require("../models/user");

const getUsers = (_req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.user === "ValidationError") {
        res.status(400).send({ message: "User don't serch" });
        return;
      }
      res.status(500).send({ message: "Server error" });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  return User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "User don't serch" });
        return;
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Id don't serch" });
      }
      res.status(500).send({ message: "Server error" });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "not correct" });
        return;
      }
      res.status(500).send({ message: "Server error" });
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
        res.status(404).send({ message: "User don't serch" });
        return;
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (
        err.name === "CastError" ||
        err.about === "ValidationError" ||
        err.name === "ValidationError"
      ) {
        res.status(400).send({ message: "data is not correct" });
        return;
      }
      res.status(500).send({ message: "Server error" });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const owner = req.user._id;
  User.findByIdAndUpdate(owner, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        res.status(400).send({ message: "data is not correct" });
        return;
      }
      res.status(500).send({ message: "Server error" });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
