const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const router = require('./routes');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
const publicDirPath = path.join(__dirname, 'public');

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static(publicDirPath));

/* Тут роуты подключаем  */
app.use('/notices', router.notices);
app.use('/news', router.news);
app.use('/friends', router.friends);
app.use('/auth', router.auth);
app.use('/user', router.user);

/* если зайти просто на '/' то будет редирект на документацию */
app.get('/', (req, res, next) => res.redirect('/doc/backDoc.pdf'));

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
