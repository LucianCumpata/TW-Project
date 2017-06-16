var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionnairesSchema = new Schema({
	Title:{
		type:String,
		require:true
	},
	item_id:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'item',
		require:true
	},
	date_opened:{
		type:Date,
		default:Date.now
	},
	date_closed:{
		type:Date
	}

});
module.exports = mongoose.model('questionnaires',questionnairesSchema);