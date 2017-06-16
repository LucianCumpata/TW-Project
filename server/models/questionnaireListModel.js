var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionnaireListSchema = new Schema({
   questionnaire_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'questionnaires',
      require:true
   },
   user_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'user',
      require:true
   }
});
module.exports = mongoose.model('questionnaireList', questionnaireListSchema);