const Book = require('../models/books');

module.exports = {
  index : (req,res) => {
    Book.find({}).exec((err,books) => {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong"
        });
      }
      return res.status(200).json({
        message: 'Success Read Book Collections',
        data: books
      });
    });
  },
  create: (req,res) => {
    Book.create(req.body,(err,book) => {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong"
        });
      }
      return res.status(200).json({
        message: 'Success Add a Book Collection',
        data: book
      });
    });
  },
  destroy: (req,res) => {
    const id = req.params.id;
    Book.findOneAndRemove({ _id : id},(err,book) => {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong"
        });
      }
      return res.status(200).json({
        message: 'Success Delete Book Collections',
        data: book
      });
    });
  },
  update: (req,res) => {
    const id = req.params.id;
    Book.findOneAndUpdate({ _id : id},req.body,{new: true},(err,book) => {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong"
        });
      }
      return res.status(200).json({
        message: 'Success Delete Book Collections',
        data: book
      });
    });
  }
};
