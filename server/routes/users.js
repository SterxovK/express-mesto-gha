const router = require("express").Router();
const {usersController, userController} = require('../controllers/users')

router.get("/users", usersController);

router.get("/users/:id", userController);

module.exports = router;
