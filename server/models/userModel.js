var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
module.exports = mongoose.model('user', userSchema);