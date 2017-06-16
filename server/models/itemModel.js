var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
	item_description:{
		type:String,
		require:true
	},
	item_tag_id:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'itemAsociations',
		require:true
	}

});
module.exports = mongoose.model('item', itemSchema);