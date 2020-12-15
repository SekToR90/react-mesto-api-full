const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request-err");
const ConflictError = require("../errors/conflict-err");
const BadAuthorizationError = require("../errors/bad-authorization-err");
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find()
    .then((data) => res.send(data))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  const { _id } = req.params;
  User.findOne({ _id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.send(user);
    })
    .catch(next);
};

module.exports.getUserInfo = (req, res, next) => { //возвращает информацию о текущем пользователе
  User.findById(req.user._id)
    .then((user) => res.send( user ))
    .catch(next);
};

// ------!
module.exports.createUser = (reg, res, next) => { //контроллер для регистрации
  const { email, password } = reg.body;

  if( !email || !password ) { //проверка на валидность введенных данных
    throw new BadRequestError('Невалидные данные');
  }

  User.findOne({ email }) //если введены валидные данные, проверяем, есть ли в базе пользователь с таким емейлом
    .then((user) => {
      if (user) {
        throw new ConflictError('Пользователь с таким email уже существует');
      }

      bcrypt.hash(password, 10)  //если пользователя нет, хешируем пароль и добавляем нового пользователя
        .then((hash) => {
          return User.create({...reg.body, password: hash})
            .then(({ email, _id }) => res.status(200).send({ email, _id }))
            .catch((err) => {
              if (err.name === 'ValidationError') {
                return next ( new BadRequestError(`Переданы некорректные данные в методы создания пользователя`));
              } else {
                next(err)
              }
            })
        })
    })
    .catch(next);
}

module.exports.login = (reg, res, next) => {
  const { email, password } = reg.body;

  if( !email || !password ) { //проверка на валидность введенных данных
    throw new BadRequestError('Невалидные данные');
  }
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new BadAuthorizationError('Неправильные почта или пароль');
      }

      bcrypt.compare(password, user.password)
        .then((matched) => {
          if(matched) {
            const token = jwt.sign({ _id: user._id },
              NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
              { expiresIn: '7d' })
            return res.send({
              token
            })
          }
          throw new BadAuthorizationError('Неправильные почта или пароль');
        })
    })
    .catch(next);
};
// -------

module.exports.updateUser = (reg, res, next) => {
  User.findByIdAndUpdate(reg.user._id, { name: reg.body.name, about: reg.body.about })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(`Переданы некорректные данные в методы обновления профиля пользователя`);
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (reg, res, next) => {
  User.findByIdAndUpdate(reg.user._id, { avatar: reg.body.avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(`Переданы некорректные данные в методы обновления аватара пользователя`);
      } else {
        next(err);
      }
    });
};
