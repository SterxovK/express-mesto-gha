const Card = require("../models/card");
const User = require("../models/user");

const getCards = (_req, res) => {
  Card.find()
    .then((data) => res.send(data))
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
  const { owner } = req.user._id;
    return  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
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
    .then((_) => res.send({ message: "карточка удалена" }))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(404)
          .send({ massage: "Пользователь по данному id не найден" });
      }
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
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(404)
          .send({ massage: "Пользователь по данному id не найден" });
      } else if (err.name === "ValidationError") {
        return res.status(400).send({
          massage: "Переданы некорректные данные при создании пользователя",
        });
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
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(404)
          .send({ massage: "Пользователь по данному id не найден" });
      } else if (err.name === "ValidationError") {
        return res.status(400).send({
          massage: "Переданы некорректные данные при создании пользователя",
        });
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
