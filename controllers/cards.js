const Card = require("../models/card");
const User = require("../models/user");

const getCards = (_req, res) => {
  Card.find()
    .then((card) => {
      if (!card) {
        return res
          .status(404)
          .send({ massage: "Карточка по данному id не найдена" });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          massage: "Переданы некорректные данные при создании пользователя",
        });
      }
      return res.status(500).send({ massage: err.massage });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      if (!card) {
        return res
          .status(404)
          .send({ massage: "Карточка по данному id не найдена" });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          massage: "Переданы некорректные данные при создании пользователя",
        });
      }
      return res.status(500).send({ massage: err.massage });
    });
};

//DELETE
const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return res
          .status(404)
          .send({ massage: "Карточка по данному id не найдена" });
      }
      return res.send({ message: "карточка удалена" });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ massage: "Некорректные данные" });
      }
      return res.status(500).send({ massage: err.massage });
    });
};

const likeCard = (req, res) => {
  const owner = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: owner } },
    { new: true, runValidators: true }
  )
    .then((card) => {
      if (!card) {
        return res
          .status(404)
          .send({ massage: "Карточка по данному id не найдена" });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(400)
          .send({ massage: "Пользователь по данному id не найден" });
      }
      return res.status(500).send({ massage: err.massage });
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
    .then((card) => {
      if (!card) {
        return res
          .status(404)
          .send({ massage: "Карточка по данному id не найдена" });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(400)
          .send({ massage: "Пользователь по данному id не найден" });
      }
      return res.status(500).send({ massage: err.massage });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
