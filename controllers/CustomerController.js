const Customer = require('../models/customers');

module.exports = {
  index : (req,res) => {
    Customer.find({}).exec((err,customers) => {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong"
        });
      }
      return res.status(200).json({
        message: 'Success Read Customer Collections',
        data: customers
      });
    });
  },
  create: (req,res) => {
    Customer.create(req.body,(err,customer) => {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong"
        });
      }
      return res.status(200).json({
        message: 'Success Add a Customer Collection',
        data: customer
      });
    });
  },
  destroy: (req,res) => {
    const id = req.params.id;
    Customer.findOneAndRemove({ _id : id},(err,customer) => {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong"
        });
      }
      return res.status(200).json({
        message: 'Success Delete Customer Collections',
        data: customer
      });
    });
  },
  update: (req,res) => {
    const id = req.params.id;
    Customer.findOneAndUpdate({ _id : id},req.body,{new: true},(err,customer) => {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong"
        });
      }
      return res.status(200).json({
        message: 'Success Delete Customer Collections',
        data: customer
      });
    });
  }
};
