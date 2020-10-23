const express = require('express');

const app = express();
const router = require('express').Router();

const { PORT = 3000 } = process.env;
const path = require('path');
const userRoutes = require('./routes/users.js');
const cardRoutes = require('./routes/cards.js');

router.use('*', (req, res, next) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', userRoutes);
app.use('/', cardRoutes);
app.use('/', router);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
