const router = require('express').Router()
const readData = require('../utils/readdata')
const path = require('path')
const jsonCardsPath = path.join(__dirname, '..', 'data', 'cards.json')

router.use('*', (req, res, next) => {
    res.send({ message: 'Запрашиваемый ресурс не найден' })
    next()
  });

router.get('/cards', (req, res) => {
    readData(jsonCardsPath)
    .then(data => res.send(data))
    .catch((err) => console.log(err))
})


module.exports = router