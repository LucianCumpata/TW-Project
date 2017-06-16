var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = new Schema({
   country:{
   	type:String,
   	require:true
   },
   city_region:{
     type:String,
     require:true
   }
});
module.exports = mongoose.model('location',locationSchema);