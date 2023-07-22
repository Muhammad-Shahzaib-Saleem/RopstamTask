// schem.js

const mongoose = require('mongoose');



const signupSchemaMetamask = new mongoose.Schema({
 
  // Field for MetaMask sign-up
  ethereumAddress: {
    type: String,
    unique: true,
    trim: true,
  },
});




const SIGNUP_METAMASK = mongoose.model('SIGNUP_METAMASK', signupSchemaMetamask);

module.exports = SIGNUP_METAMASK;
