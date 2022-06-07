const router = require("express").Router();
const {
  usersController,
  userController,
  createUser,
} = require("../controllers/users");

router.get("/users", usersController);

router.get("/users/:id", userController);

router.post("/users", createUser)

module.exports = router;
