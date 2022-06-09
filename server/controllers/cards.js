const Card = require("../models/card");
const User = require("../models/user")

const cardsController = (_req, res) => {
  Card.find()
    .then((data) => res.send(data))
    .catch((_) => res.status(404).sand({ massage: "No file" }));
};

//DELETE
const deleteCard = (req, res) => {
   Card.findByIdAndRemove(req.params.cardId)
     .then((_) => res.send({ message: "карточка удалена" }))
     .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
  };


const createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен
  const {name, link} = req.body;
  User.findById(req.user._id)
  .then((owner) => {
    console.log(owner)
    Card.create({name, link, owner})
  })
      .then((card) => res.send(card))
     .catch((err) => res.status(500).send({messege: err.massege}));
 };

const likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    console.log(req.user._id),
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  );

const dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  );


module.exports = {
  cardsController,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};