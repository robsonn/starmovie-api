var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
var Schema = mongoose.Schema;

var PlanetSchema = new Schema({
     name: {type: String, unique: true},
     climate: String,
     terrain: String,
     movies: [],
     createdAt: {type: Date, default: new Date()},
     updatedAt: {type: Date, default: new Date()}
  })
 
  PlanetSchema.plugin(mongoosePaginate)
  module.exports = mongoose.model("Planet", PlanetSchema)