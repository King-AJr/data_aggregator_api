const express = require('express');
const bp = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/authRoute');
const dataRouter = require('./routes/dataRoute');

const app = express();
dotenv.config();

// env variables
const db = process.env.DATABASE.replace(
    '<password>',
    process.env.PASSWORD
);

// database connection
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((res) => {
    console.log('successfully connected to database')
  });


const PORT = process.env.PORT || 8080;

// middlewares
app.use(bp.json());
app.use('', authRouter);
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 mimutes
    max: 3
});

app.use(limiter);
app.use('', dataRouter);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

module.exports = app;