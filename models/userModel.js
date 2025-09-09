const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const signupSchema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  email: {
    type: String,
  },
  // password:{
  //   type:String,
    
  // },
  phonenumber:{
    type:Number, 
  },
  role:{
    type:String,
   
  }
});


signupSchema.plugin(passportLocalMongoose,{
  usernameField: 'email'
});

module.exports = mongoose.model('UserModel', signupSchema);