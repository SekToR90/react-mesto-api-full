const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getUsers, getUser, getUserInfo, updateUser, updateAvatar, login, createUser,
} = require('../controllers/users.js');

router.get('/users', auth, getUsers); // возвращает всех пользователей
router.get('/users/me', auth, getUserInfo); // получаем пользователя
router.get('/users/:_id', auth, getUser); // возвращает пользователя по _id

router.patch('/users/me', auth, celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string(),
    about: Joi.string().min(2).max(30),
  }),
  params: Joi.object().keys({
    _id: Joi.string().required().alphanum().length(24),
  }),
}), updateUser); // обновляет профиль

router.patch('/users/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string(),
    about: Joi.string().min(2).max(30),
  }),
  params: Joi.object().keys({
    _id: Joi.string().required().alphanum().length(24),
  }),
}), updateAvatar); // обновляет аватар

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string(),
    about: Joi.string().min(2).max(30),
  }),
}), login); // роут для логина

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    about: Joi.string().min(2).max(30),
  }),
}), createUser); // создаёт пользователя

module.exports = router;
