const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const auth = require('./middleware/Auth');
const SIGNUP = require('./model/schem');
const SIGNUP_METAMASK = require('./model/schema-metamask');

const sendMail = require("./Controller/email");



//set view engine
app.set('view engine' , 'ejs')

// SET here all middleware
// express midelware to show post data 
app.use(express.urlencoded({extended :true}));
app.use(cookieParser());


// ***********   setup mongoDb   ***********

const mongodb = "mongodb://localhost:27017/SIGNUP_JWT";
mongoose.connect(mongodb ,
  { useNewUrlParser: true, useUnifiedTopology: true }).then(()=> 
{
console.log("connected DB")
app.listen(3100)
}
)
.catch(err => console.log(err))



//  direct the homepage to showdata route

app.get('/', function (req, res)  { 
res.render('signup' );

})

app.get('/login', function (req, res)  { 
  res.render('login' );
  
  })

  app.get('/private',  auth , function (req, res)  { 
    res.render('private' , {name :  req.username})

  })


 

 
// ************************************   SIGNUP  Request ************************

// when submit button click then /iten route call and upload data on mongodb database
app.post('/signup' , async (req , res) =>{

  // add data in schema 
  const item = new SIGNUP(req.body) ;


// ***  JWT START   ********

// calling generateAurhToken function for creating a jwt token on user id

 const token = await item.generateAuthToken();
 console.log("generate token is " , token);

 // *** JWT END   *****
 

 // saving data in database
 if(req.body.password === req.body.cpassword){

 const savingdata = await  item.save().then(result =>  
    {
      console.log("successfully register ");

       // Send a welcome email to the user
       const to = req.body.email;
       const subject = "Welcome to our website";
       const text = "Thank you for signing up. Welcome to our website!";
       sendMail(to, subject, text);
      
    res.redirect('/login');

})
}else{
  console.log("confirm password is not match");
}
})



// ************************************* LOGIN  Request ************************

app.post('/logindetail',  async (req, res) => {   
  try{
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  const user =  await SIGNUP.findOne({email : email});
  // compare entering  password with hashing password value in database using bcrypt 
  const isMatch = await bcrypt.compare(password , user.password );
  if(isMatch){
    console.log("come");
    const token = await user.generateAuthToken();
    console.log("generate token is " , token);

    // set JWT TOKEN in cookie
    res.cookie("jwt" , token ,{
      expires: new Date(Date.now() + 900000),  // JWT expire time  in seconds
       httpOnly: true                 // no one can change using js
    });

   // after set JWT in cookie rediect to main page 
    res.render('main' );
  }else{
    console.log("password is incorrect");
  }
 
}
catch(err){
  res.status(400).send("invalid email");

}  
})

// ************************************* MetaMask SIGNUP Request ************************

app.get('/metamask-signup', (req, res) => {
  res.render('metamask-signup');
});

app.post('/metamask-signup', async (req, res) => {
  try {
    // Get the signed message and user's Ethereum address from the request body
    const { signedMessage, ethereumAddress } = req.body;

    // Verify the signed message using Web3.js or other libraries
    // For simplicity, we'll assume a valid signature for demonstration purposes
    const isSignatureValid = true;

    if (isSignatureValid) {
      // Check if the Ethereum address is already registered in the database
      const existingUser = await SIGNUP_METAMASK.findOne({ ethereumAddress });
      if (existingUser) {
        console.log('Sucessfull Login.');
        res.status(400).send('Sucessfull Login.');
      } else {
        // Create a new user record in the database with the Ethereum address
        const newUser = new SIGNUP_METAMASK({ ethereumAddress });
        await newUser.save();

        // Redirect the user to the main page or any other page after successful sign-up
        res.redirect('/main');
      }
    } else {
      console.log('Invalid signature.');
      res.status(401).send('Invalid signature.');
    }
  } catch (err) {
    console.log('Error during MetaMask sign-up:', err);
    res.status(500).send('Error during MetaMask sign-up.');
  }
});


