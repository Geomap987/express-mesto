const router = require('express').Router();
const path = require('path');
const readData = require('../utils/readdata');

const jsonCardsPath = path.join(__dirname, '..', 'data', 'cards.json');

router.get('/cards', (req, res) => {
  readData(jsonCardsPath)
    .then((data) => res.send(data))
    .catch(() => res.status(500).send({ message: 'Ошибка чтения файла' }));
});

module.exports = router;
