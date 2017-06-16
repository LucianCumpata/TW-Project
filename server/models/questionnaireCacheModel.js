var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionnaireCacheSchema = new Schema({
	questionnaire_id:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'questionnaires',
		require:true
	},
	questionnaireCache_id:{
		type:Number,
		require:true
	}
});
module.exports = mongoose.model('questionnaireCache',questionnaireCacheSchema);
