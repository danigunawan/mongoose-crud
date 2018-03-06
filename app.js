const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/library_mongoose";
const books = require('./routes/books');
const customers = require('./routes/customers');
const transactions = require('./routes/transactions');
mongoose.connect(url,(err) => {
  if (!err) {
    console.log('Success Connect To Database!');
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/books',books);
app.use('/customers',customers);
app.use('/customers',customers);
app.use('/transactions',transactions);

const port = process.env.PORT || 3000;

app.listen(port,() => {
  console.log(`App listening on port ${port}`);
});
