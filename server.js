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
app.use(cors());
app.use(express.json());

app.use('/api/v1/data', dataRouter);
app.use('/api/v1/auth', authRouter)


app.use((err, req, res, next) => {
    const errorStatus = err.statusCode || 500;
    const errorMessage = err.message || 'Internal server error';
    res.status(errorStatus).send({
        success: false,
        status: errorStatus,
        error: errorMessage,
        stack: err.stack
    });
}
)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})
