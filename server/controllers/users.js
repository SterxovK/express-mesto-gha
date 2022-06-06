const path = require("path");

const pathToFile = path.join(__dirname, "..", "data", "users.json");
const readFile = require("../utils/read-file");

const usersController = (_req, res) => {
  readFile(pathToFile)
    .then((data) => res.send(data))
    .catch((_) => res.status(404).sand({ massage: "No file" }));
};

const userController = (req, res) => {
  const { id } = req.params;
  readFile(pathToFile)
    .then((data) => data.find((user) => user.id === id))
    .then((data) => {
      if (!data) {
        throw new Error();
      }
      res.send(data);
    })
    .catch((_) => res.status(404).send({ massage: "No user" }));
};

module.exports = { usersController, userController };
