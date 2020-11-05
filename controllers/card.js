/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send({ message: 'Ошибка чтения файла' }));
};
const deleteCardById = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove({ _id: cardId })
    .then((card) => {
      if (!card) {
        res.status(400).send({ message: 'Нет карточки с таким id' });
      } else {
        res.send({ message: card });
      }
    })
    .catch((err) => {
      if (err.kind === undefined) {
        return res.status(404).send({ message: err.message });
      } if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Нет карточки с таким id' });
      }
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const { id } = req.user;
  Card.create({
    name,
    link,
    owner: id,
  })
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errorList = Object.keys(err.errors);
        const messages = errorList.map((item) => err.errors[item].message);
        res.status(400).send({ message: `Ошибка валидации: ${messages.join(' ')}` });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};

module.exports = {
  getCards,
  deleteCardById,
  createCard,
};
