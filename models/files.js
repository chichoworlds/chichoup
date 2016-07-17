var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var file_schema = new Schema({
  name : String,
  created: {type: Date, defauly: Date.now}
});

module.exports = mongoose.model('File', file_schema);
