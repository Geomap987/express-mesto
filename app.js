const express = require('express')

const app = express()
const {PORT = 3000} = process.env;
const path = require('path')
const userRoutes = require('./routes/users.js')
const cardRoutes = require('./routes/cards.js')

app.use(express.static(path.join(__dirname, 'public')))
app.use('/', userRoutes)
app.use('/', cardRoutes)

// app.get('/', (req, res) => {
//     res.send('hello masha you are the best')
// })

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))