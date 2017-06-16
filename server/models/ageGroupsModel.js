var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ageGroupSchema = new Schema({
    age_interval:{
    	type:Array,
    	require:true
    },
    age:{
    	type:Number,
    	require:true
    }
});
module.exports = mongoose.model('ageGroups',ageGroupsSchema);