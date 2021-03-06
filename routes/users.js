/* eslint-disable linebreak-style */
const router = require('express').Router();

const {
  getUsers, getUserById, createUser, updateUserName, updateUserAvatar,
} = require('../controllers/user');

router.get('/users', getUsers);

router.get('/users/:id', getUserById);

router.post('/users', createUser);

router.patch('/users/me', updateUserName);

router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
