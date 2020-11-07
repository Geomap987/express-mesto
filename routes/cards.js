/* eslint-disable linebreak-style */
const router = require('express').Router();
const {
  getCards, deleteCardById, createCard, addLike, deleteLike,
} = require('../controllers/card');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCardById);
router.put('/cards/:cardId/likes', addLike);
router.delete('/cards/:cardId/likes', deleteLike);

module.exports = router;
