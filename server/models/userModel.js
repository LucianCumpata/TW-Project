var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

//email regex from: https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax

/*user model structure*/
var userSchema = new Schema({
  user_name:{
    type:String,
    require:true
  },
  password:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true,
    match:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  avatar: {
    type: String,
    default: 'http://placehold.it/350x250'
  },
  role: {
    type: String,
    default: 'interviewer'
  },
  registerDate: {
    type: Date,
    default: Date.now
  }
});

userSchema.methods.hashPassword = function (pass) {
  return bcrypt.hashSync(pass, 10);//bcrypt.genSaltSync(10), null);
};

userSchema.methods.checkPassword = function (pass) {
  return bcrypt.compareSync(pass, this.password);
};

module.exports = mongoose.model('user', userSchema);