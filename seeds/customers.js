
const mongoose = require('mongoose');
const url = "mongodb://localhost/library_mongoose";
mongoose.connect(url,(err) => {
  if (!err) {
    console.log('Success Connect To Database!');
  }
});
const Customer = require('../models/customers');

Customer.remove({},(err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Remove All Customers Collection');
  }
})

let customer = new Customer({
  name: 'Rubi Henjaya',
  memberid: 'CL0001',
  address: 'Ujung Berung Bandung',
  zipcode: '40294',
  phone: "081112237788"
});

customer.save((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Success Add New Customer');
  }
})

customer = new Customer({
  name: 'Riza Fahmi',
  memberid: 'CL0002',
  address: 'Something in Jakarta',
  zipcode: '50022',
  phone: '081122336655'
});

customer.save((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Success Add New Customer');
  }
})
