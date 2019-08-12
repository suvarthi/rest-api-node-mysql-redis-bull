const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

app.listen('3000', () => {
  console.log("Server is up and running");
})

app.get('/', (req, res) => {
  res.send("Please enter a valid url");
})

const bookRouter = require('./routes/books');
app.use('/api', bookRouter);

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    })
})