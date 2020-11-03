/* eslint-disable linebreak-style */
const router = require('express').Router();
const { getCards, deleteCardById, createCard } = require('../controllers/card');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCardById);

module.exports = router;
