const router = require("express").Router();
const {
  usersController,
  userController,
  createUser,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

router.get("/users", usersController); //получить всех юзеров

router.get("/users/:userId", userController); //получить юзера по id

router.post("/users", createUser) //создать нвоого юзера


router.patch("/users/me", updateUser); //обновляет профиль
router.patch("/users/me/avatar", updateAvatar); //обновляет аватар

module.exports = router;
