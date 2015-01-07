(function CharacterTypeScope(mongoose) {
  'use strict';

  var Schema = mongoose.Schema;

  var characterTypeSchema = new Schema({
    _id: Number,
    name: String
  });

  var CharacterType = mongoose.model('CharacterType', characterTypeSchema);
  CharacterType.CharacterTypes = {
    SOLDIER: 0,
    KNIGHT: 1,
    ARCHER: 2,
    MAGE: 3,
    LANCER: 4,
    HERO: 5,
    SAGE: 6
  };

  module.exports = CharacterType;
}(require('mongoose')));
