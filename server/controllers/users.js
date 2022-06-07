const path = require("path");

const User = require("../models/user");
const pathToFile = path.join(__dirname, "..", "data", "users.json");
const readFile = require("../utils/read-file");

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

module.exports = { usersController, userController, createUser };
