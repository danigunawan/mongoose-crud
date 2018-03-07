const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Book = require('./books');

const transactionSchema = new Schema({
  member: {
    type: Schema.Types.ObjectId,
    ref: 'Customer'
  } ,
  days: Number,
  out_date: {
    type: Date,
    default: Date.now
  },
  due_date: Date,
  in_date: Date,
  fine: Number,
  booklist:[{
    type: Schema.Types.ObjectId,
    ref: 'Book'
  }],
});

transactionSchema.pre('save', function(next) {
  let due_date = new Date(this.out_date);
  due_date.setDate(due_date.getDate() + this.days);
  this.due_date = due_date;
  this.fine = 0;
  let books = this.booklist;
  for (var i = 0; i < books.length; i++) {
    Book.findOne({_id: books[i]},(err,data) => {
      let currentStock = data.stock - 1;
      Book.update({_id:data._id},{$set:{ stock: currentStock }},(err,data) => {
        if (err) {
          console.log(err);
        }
        console.log(data);
      })
    })
  }
  next();
});

transactionSchema.pre('findOneAndUpdate', function(next) {
  let id = this._conditions._id;
  let Transaction = this;
  this.findOne({_id:id },(err,data) => {
    let date1 = new Date(data.due_date);
    let date2 = new Date(data.in_date);
    let timeDiff = Math.abs(date2.getTime() - date1.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    let fine;
    if (diffDays > 0) {
      fine = diffDays * 1000;
    }
    Transaction.update({_id:id},{ $set: { fine: fine } },(err,data) => {
      if (err) {
        console.log(err);
      }
      console.log(data);
    });
    let books = data.booklist;
    for (var i = 0; i < books.length; i++) {
      Book.findOne({_id: books[i]},(err,data) => {
        let currentStock = data.stock + 1;
        Book.update({_id:data._id},{$set:{ stock: currentStock }},(err,data) => {
          if (err) {
            console.log(err);
          }
          console.log(data);
        })
      })
    }
  })
  next();
});

transactionSchema.pre('findOneAndRemove', function(next) {
  let id = this._conditions._id;
  let Transaction = this;
  this.findOne({_id:id },(err,data) => {
    let books = data.booklist;
    for (var i = 0; i < books.length; i++) {
      Book.findOne({_id: books[i]},(err,data) => {
        let currentStock = data.stock + 1;
        Book.update({_id:data._id},{$set:{ stock: currentStock }},(err,data) => {
          if (err) {
            console.log(err);
          }
          console.log(data);
        })
      })
    }
  })
  next();
});

module.exports = mongoose.model('Transaction',transactionSchema);
