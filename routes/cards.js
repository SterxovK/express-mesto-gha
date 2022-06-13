const router = require('express').Router();
const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards); // получить все карточки
router.post('/', createCard); // создать карточку
router.delete('/:cardId', deleteCard); // удалить карточку
router.put('/:cardId/likes', likeCard); // поставить лайк карточке
router.delete('/:cardId/likes', dislikeCard); // убрать лайк с карточки

module.exports = router;
