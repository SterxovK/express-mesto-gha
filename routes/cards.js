const router = require("express").Router();
const {
  cardsController,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/cards", cardsController); //получить все карточки

router.post("/cards", createCard); //создать карточку

router.delete("/cards/:cardId", deleteCard); //удалить карточку


router.put("/cards/:cardId/likes", likeCard); //поставить лайк карточке
router.delete("/cards/:cardId/likes", dislikeCard); //убрать лайк с карточки

module.exports = router;
