(function CharacterTypeScope(mongoose) {
  'use strict';

  var Schema = mongoose.Schema;

  var characterTypeSchema = new Schema({
    _id: Number,
    x: Number,
    y: Number
  });

  var CharacterType = mongoose.model('CharacterType', characterTypeSchema);

  module.exports = CharacterType;
}(require('mongoose')));
