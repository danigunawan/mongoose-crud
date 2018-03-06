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
    Transaction.create(req.body,(err,transaction) => {
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
    Transaction.findOneAndUpdate({ _id : id},req.body,{new: true},(err,transaction) => {
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
