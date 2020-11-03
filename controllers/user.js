/* eslint-disable linebreak-style */
const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: 'Ошибка чтения файла' }));
};

const getUserById = (req, res) => {
  const { id } = req.params;
  User.findOne({ _id: id })
  // eslint-disable-next-line consistent-return
    .orFail(() => {
      const err = new Error('Не найден');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => {
      res.send(user);
    })
  // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.kind === undefined) {
        return res.status(err.statusCode).send({ message: err.message });
      } if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Неправильный id' });
      }
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({
    name,
    about,
    avatar,
  })
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errorList = Object.keys(err.errors);
        const messages = errorList.map((item) => err.errors[item].properties.message);
        res.status(400).send({ message: `Ошибка валидации: ${messages.join(' ')}` });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
