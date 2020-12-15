const Card = require('../models/card');
const BadRequestError = require("../errors/bad-request-err");
const ForbiddenError = require("../errors/forbidden-err");
const NotFoundError = require("../errors/not-found-err");

module.exports.getCards = (req, res, next) => {
  Card.find()
    .then((data) => res.send(data))
    .catch(next);
};

module.exports.createCards = (req, res, next) =>
  Card.create({ owner: req.user._id, ...req.body })
  .then((card) => res.status(200).send(card))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      throw new BadRequestError(`Переданы некорректные данные в методы создания карточки`);
    } else {
      next(err);
    }
  });

module.exports.deleteCards = (req, res, next) => {
  const cardId = req.params.cardId;

  Card.findById(cardId)
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
       return  next (new ForbiddenError('Невозможно удалить чужую карточку'));
      } else {
        Card.findByIdAndRemove(cardId)
          .orFail()
          .then((card) => res.send({data: card}))
          .catch((err) => {
            if (err.name === 'CastError') {
              return  next (new NotFoundError(`Карточка не найдена`));
            } else {
              next(err);
            }
          });
      }
    })
}

module.exports.likeCard = (req, res, next) =>
  Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail()
  .then((card) => res.send({ data: card }))
  .catch((err) => {
    if (err.name === 'CastError') {
      return  next (new NotFoundError(`Карточка не найдена`));
    } else {
      next(err);
    }
  });

module.exports.dislikeCard = (req, res, next) =>
  Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail()
  .then((card) => res.send({ data: card }))
  .catch((err) => {
    if (err.name === 'CastError') {
      return  next (new NotFoundError(`Карточка не найдена`));
    } else {
      next(err);
    }
  });
