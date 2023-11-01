const express = require('express');
const app = express();
const bp = require('body-parser');

const index = require('./routes/index');

const PORT = process.env.PORT || 8080;

app.use(bp.json());


const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 mimutes
    max: 3
});

app.use(limiter);


app.use('', index);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

module.exports = app;