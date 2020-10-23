const router = require('express').Router();
const path = require('path');
const readData = require('../utils/readdata');

const jsonUsersPath = path.join(__dirname, '..', 'data', 'users.json');

router.get('/users', (req, res) => {
  readData(jsonUsersPath)
    .then((data) => res.send(data))
    .catch(() => res.status(500).send({ message: 'Ошибка чтения файла' }));
});

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  readData(jsonUsersPath)
    .then((data) => {
      const userToFind = data.find((user) => user._id === id);
      return userToFind;
    })
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      res.send(user);
    })
    .catch(() => res.status(500).send({ message: 'Ошибка чтения файла' }));
});

module.exports = router;
