var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var answerSchema=new Schema({
	answer_collection_nr:{
		type:Number,
		require:true
	},
	question_id:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'questions',
		require:true
	},
	answer:{
		type:String,
		require:true
	},
	loc_id:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'location',
		require:true
	},
	age_group_id:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'ageGroups',
		require:true
	}
});
module.exports = mongoose.model('answers',answerSchema);