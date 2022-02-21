let mongoose = require('mongoose');


//create a model class
let businessContactsModel = mongoose.Schema({

    id: String,
    ContactName: String,
    ContactNumber: String,
    Email: String,
  
  }, 
  {
    collection: "businessContacts"
  });
  
  

  module.exports = mongoose.model("BusinessContacts", businessContactsModel);