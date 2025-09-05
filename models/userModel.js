const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
  fullname: {
    type: String,
    
  },
  email: {
    type: String,
    unique:true
  },
  // password:{
  //   type:String,
  //   required:true,
  // },
  phonenumber:{
    type:Number,
    
  },
  role:{
    type:String,
    
  }
});

module.exports = mongoose.model('UserModel', signupSchema);