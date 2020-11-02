const express = require('express');

const app = express();
const mongoose = require('mongoose');
const router = require('express').Router();

const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users.js');
const cardRoutes = require('./routes/cards.js');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    id: '5f9dd654a5e3113ce00bf6e6',
  };
  next();
});
router.use('*', (req, res, next) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
  next();
});

app.use('/', userRoutes);
app.use('/', cardRoutes);
app.use('/', router);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
