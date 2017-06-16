var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionsSchema = new Schema({
  questionnaire_id:{
  	type:mongoose.Schema.Types.ObjectId,
  	ref:'questionnaires',
  	require:true
  },
  question:{
  	type:String,
  	require:true
  }
});
module.exports = mongoose.model('questions',quetionsSchema);