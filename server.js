const express = require('express');
const app = express();
const bp = require('body-parser');

const index = require('./routes/index');

const PORT = process.env.PORT || 8080;

app.use(bp);

app.use('', index);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})
