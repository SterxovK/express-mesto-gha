const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getUserMe,
} = require('../controllers/users');

const REGEX = /^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

router.get('/', getUsers); // получить всех юзеров
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), getUser); // получить юзера по id
router.get('/me', getUserMe); // получить свой профиль
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUser,
); // обновляет профиль
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .min(2)
        .custom((value, helpers) => {
          if (REGEX.test(value)) {
            return value;
          }
          return helpers.message('Некорректная ссылка');
        }),
    }),
  }),
  updateAvatar,
); // обновляет аватар

module.exports = router;
