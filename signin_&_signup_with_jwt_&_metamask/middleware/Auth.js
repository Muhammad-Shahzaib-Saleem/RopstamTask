var jwt = require('jsonwebtoken');
const SIGNUP = require('../schem');

const auth = async (req , res , next) =>{
    try {

        const token = req.cookies.jwt ;
        // verify user using jwt
        // here we need to add 32 character string which we passed wgile creating jwt token , best practice is that we will pass this string using .env file

        const verifyUser = jwt.verify(token , "mynameisshahzaibsaleemiamfromgujranwala");

        // this verifyuser return a object with id .
        // we can find user using this id , and get user all detail

        const user = await SIGNUP.findOne({_id :verifyUser._id })
         console.log(user);
         req.username = user.name;
        next();
        
    } catch (error) {
        console.log(error);
        
    }
}


module.exports = auth ;

