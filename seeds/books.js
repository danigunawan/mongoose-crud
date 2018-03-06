const mongoose = require('mongoose');
const url = "mongodb://localhost/library_mongoose";
mongoose.connect(url,(err) => {
  if (!err) {
    console.log('Success Connect To Database!');
  }
});
const Book = require('../models/books');

Book.remove({},(err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Remove All Books Collection');
  }
})

let book = new Book({
  isbn: '978-1-60309-057-5',
  title: 'Dragon Puncher',
  author: 'James Kochalka',
  category: 'All Ages',
  stock: 3
});

book.save((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Success Add New Book');
  }
})

book = new Book({
  isbn: '978-1-891830-77-8',
  title: 'Every Girl is the end of the world for me',
  author: 'Jeffrey Brown',
  category: 'Mature (16+)',
  stock: 5
});

book.save((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Success Add New Book');
  }
})
