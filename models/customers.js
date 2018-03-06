const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: String,
  memberid: String,
  address: String,
  zipcode: String,
  fine: Number,
  phone: Number,
});

module.exports = mongoose.model('Customer',customerSchema);
