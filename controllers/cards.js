const Card = require("../models/card");

const getCards = (_req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch(() => res.status(500).send({ message: "Server error" }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({data: card}))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Validation is not corrected" });
        return;
      } res.status(500).send({ message: "Server error" });
    });
};

//DELETE
const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
  .then((card) => {
    if(!card) {
      res.status(404).send({ message: "Card this id not found" });
      return
    }
        res.send({data:card})
      })
    .catch((err) => {
      if (err.name === "CastError") {
       res.status(400).send({ message: " id is not correct" });
       return;
      }  res.status(500).send({ message: "Server error" });
    });
};

const likeCard = (req, res) => {
  const owner = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: owner } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Card this id not found" });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: " id is not correct" });
        return;
      }
      res.status(500).send({ message: "Server error" });
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
        res.status(404).send({ message: "Card this id not found" });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: " id is not correct" });
        return;
      }
      res.status(500).send({ message: "Server error" });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
