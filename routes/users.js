const router = require('express').Router()
const readData = require('../utils/readdata')
const path = require('path')
const jsonUsersPath = path.join(__dirname, '..', 'data', 'users.json')

router.get('/users', (req, res) => {
    readData(jsonUsersPath)
    .then(data => res.send(data))
    .catch((err) => console.log(err))
})

router.get('/users/:id', (req, res) => {
    const {id} = req.params
    readData(jsonUsersPath)
    .then(data => {
        const userToFind = data.find(user => user._id === id)
        return userToFind})
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: 'Нет пользователя с таким id'})
            }
            res.send(user)
        })
        .catch((err) => console.log(err))
})

module.exports = router