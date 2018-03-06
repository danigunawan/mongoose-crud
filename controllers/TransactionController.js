const Transaction = require('../models/transactions');

module.exports = {
  index : (req,res) => {
    Transaction.find({})
      .populate('member')
      .populate('booklist')
      .exec((err,transactions) => {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong"
        });
      }
      return res.status(200).json({
        message: 'Success Read Transaction Collections',
        data: transactions
      });
    });
  },
  create: (req,res) => {
    let input = {
      member: req.body.member,
      days: req.body.days,
      out_date: req.body.out_date,
      due_date: req.body.due_date,
      in_date: req.body.in_date,
      fine: req.body.fine,
      booklist:[req.body.book],
    }
    Transaction.create(input,(err,transaction) => {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong"
        });
      }
      return res.status(200).json({
        message: 'Success Add a Transaction Collection',
        data: transaction
      });
    });
  },
  destroy: (req,res) => {
    const id = req.params.id;
    Transaction.findOneAndRemove({ _id : id},(err,transaction) => {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong"
        });
      }
      return res.status(200).json({
        message: 'Success Delete Transaction Collections',
        data: transaction
      });
    });
  },
  update: (req,res) => {
    const id = req.params.id;
    let input = req.body;
    if (req.body.book) {
      input.booklist.push(req.body.book);
    }
    Transaction.findOneAndUpdate({ _id : id},input,{new: true},(err,transaction) => {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong"
        });
      }
      return res.status(200).json({
        message: 'Success Update Transaction Collections',
        data: transaction
      });
    });
  }
};
