const Card = require('../models/card');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');

module.exports.getCards = (req, res, next) => {
  Card.find()
    .then((data) => res.send(data))
    .catch(next);
};

module.exports.createCards = (req, res, next) => Card.create({ owner: req.user._id, ...req.body })
  .then((card) => res.status(200).send(card))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      throw new BadRequestError('Переданы некорректные данные в методы создания карточки');
    } else {
      next(err);
    }
  });

module.exports.deleteCards = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка не найдена'));
      } else if (card.owner.toString() !== req.user._id) {
        return next(new ForbiddenError('Невозможно удалить чужую карточку'));
      }
      Card.findByIdAndRemove(cardId)
        .orFail()
        .then(() => res.send({ data: card }))
        .catch((err) => next(err));
    });
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail()
  .then((card) => res.send({ data: card }))
  .catch((err) => {
    if (err.name === 'DocumentNotFoundError') {
      return next(new NotFoundError('Карточка не найдена'));
    }
    next(err);
  });

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail()
  .then((card) => res.send({ data: card }))
  .catch((err) => {
    if (err.name === 'DocumentNotFoundError') {
      return next(new NotFoundError('Карточка не найдена'));
    }
    next(err);
  });
