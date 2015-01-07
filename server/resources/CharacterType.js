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
    LANCER: 1,
    KNIGHT: 2,
    ARCHER: 3,
    MAGE: 4,
    HERO: 5,
    SAGE: 6
  };

  module.exports = CharacterType;
}(require('mongoose')));
