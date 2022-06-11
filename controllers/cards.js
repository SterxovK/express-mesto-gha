const Card = require("../models/card");
const User = require("../models/user");
const NotFoundError = require("../errors/NotFoundError");
const InvalidRequest = require("../errors/InvalidRequest");

const getCards = (_req, res, next) => {
  Card.find({})
    .then((card) => {
      res.status(200).send(card);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  return Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(
          new InvalidRequest(
            "Переданы некорректные данные при создании пользователя"
          )
        );
      } else {
        next(err);
      }
    });
};

//DELETE
const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  return Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError("нет карточки с таким id");
    })
    .then((card) => {
      return Card.findByIdAndRemove(cardId).then(() => {
        res.send(200).send({ message: "карточка удалена" });
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new InvalidRequest("Некорректные данные"));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  const owner = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: owner } },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      throw new NotFoundError("нет карточки с таким id");
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new InvalidRequest("Некорректные данные"));
      }
      next(err);
    });
};

const dislikeCard = (req, res) => {
  const owner = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: owner } },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      throw new NotFoundError("нет карточки с таким id");
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new InvalidRequest("Некорректные данные"));
      }
      next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
