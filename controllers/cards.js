const Card = require("../models/card");
const User = require("../models/user");

const getCards = (_req, res) => {
  Card.find()
    .then((data) => res.send(data))
    .catch((_) => res.status(404).sand({ massage: "No file" }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  User.findById(req.user._id)
    .then((owner) => {
      console.log(owner);
      Card.create({ name, link, owner });
    })
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ messege: "Произошла ошибка" }));
};

//DELETE
const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((_) => res.send({ message: "карточка удалена" }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

const likeCard = (req, res) => {
  const owner = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: owner } }, { new: true },)
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        new Error("Переданы некорректные данные...");
      }
    });
};

const dislikeCard = (req, res) => {
  const owner = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: owner } }, { new: true },)
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === "CastError") {
      return res.status(400).send({messege:"Переданы некорректные данные..."})
      }
      });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
