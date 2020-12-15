const router = require('express').Router();
const auth = require('../middlewares/auth');
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCards, deleteCards, likeCard, dislikeCard,
} = require('../controllers/cards.js');

router.get('/cards', auth,  getCards); //возвращает все карточки

router.post('/cards', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), createCards);  //создаёт карточку

router.delete('/cards/:cardId', auth, celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().alphanum().length(24),
    }).unknown(true),
  }), deleteCards); //удаляет карточку по идентификатору

router.put('/cards/:cardId/likes', auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), likeCard);

router.delete('/cards/:cardId/likes', auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), dislikeCard);

module.exports = router;
