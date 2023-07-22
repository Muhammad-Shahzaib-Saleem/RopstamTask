const mongoose = require('mongoose');


//Schema of Car
const carSchema = new mongoose.Schema({
    
    categories: {
        type: String,
        required: true,
        trim: true
        
      },
      color: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
      },
      model: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
      },
      make: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
      },
      registration_no: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 20,
      },
});


//Model Creation of Car

const Car = new mongoose.model('Car',carSchema);

module.exports = Car;