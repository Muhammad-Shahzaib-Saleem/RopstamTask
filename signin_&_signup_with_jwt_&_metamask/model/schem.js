const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;
const signSchema = new Schema({
    name: {
        type: String,
        required: true
        },
    email:{
         type : String,
         required : true
    }  ,
    password: {
        type: String,
        required: true
        },
    // for storing jwt token 
    tokens:[{
        token:{
            type : String,
            required : true
        }
    }]



} , {timestamps: true});



// *************     JWT START   ***************
// method is use to create jwt token
// it's a middleware method 
// before data store on database this method is run and sav jwt token against user id 
// here this keyword get whole data from app.js /signup 
signSchema.methods.generateAuthToken = async function() {
 try{
    // digit character minimum 32 character 
    // this_id showing the current register user id , jwt token generate on current user id 

 const jwttoken = jwt.sign({_id : this._id  }, "mynameisshahzaibsaleemiamfromgujranwala");
 // assign jwt token to tokens value in schema 
 this.tokens = [{token : jwttoken}];
  // saving  jwt token in database
  await this.save() ;

 return jwttoken;


 }
 catch(err){
   console.log(err)


 }
} 






// *************     Bcrypt START   ***************
// pre is a middle ware . 
// pre function run before running save method "save method use store data in database . (in app.js file)"
// next is a middle ware function too it's using for countinue the processing after pre function

signSchema.pre("save" , async function(next){

    if(this.isModified("password")){
        // storing password in secure way using bcrypt hash with 10 security rounds
        this.password = await bcrypt.hash(this.password , 10);
        

    }
    next();
})

// *************     Bcrypt  END    ***************



// here item is a collection name 
// if you write practice it will find practices in database 
// as like if you write abc it will find abcs collaction  in database

const SIGNUP = mongoose.model('SIGNUP' , signSchema )
module.exports = SIGNUP ;