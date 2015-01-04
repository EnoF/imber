(function BoardScope(mongoose) {
  'use strict';

  var Schema = mongoose.Schema;

  var boardSchema = new Schema({
    _id: Number,
    x: Number,
    y: Number
  });

  var Board = mongoose.model('Board', boardSchema);

  module.exports = Board;
}(require('mongoose')));
