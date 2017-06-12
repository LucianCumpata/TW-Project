var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var itemAsociationsSchema=new Schema({
	tags:{
		type:String,
		require:true
	}
});
module.exports = mongoose.model('itemAsociations', itemAsociationsSchema);