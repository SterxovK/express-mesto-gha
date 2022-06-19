const Card = require('../models/card');
const NotFoundError = require('../Error/NotFoundError');
const CastError = require('../Error/CastError');
const ForbiddenError = require('../Error/ForbiddenError');
const NotValidError = require('../Error/NotFoundError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch(next);
};

const createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    const card = await Card.create({ name, link, owner });
    res.status(201).send({ data: card });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new NotValidError('Validation is not corrected'));
    } else {
      next(error);
    }
  }
};

// DELETE
const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card this id not found');
      }
      if (card.owner._id.toString() !== req.user._id.toString()) {
        throw new ForbiddenError("someone else's card");
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError(' id is not correct');
      }
      next(err);
    });
};

const likeCard = (req, res, next) => {
  const owner = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: owner } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card this id not found');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError(' id is not correct');
      }
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  const owner = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: owner } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card this id not found');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError(' id is not correct');
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
