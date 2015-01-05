(function CharacterScope(mongoose) {
  'use strict';

  var Schema = mongoose.Schema;

  var characterScheme = new Schema({
    game: {
      type: Schema.Types.ObjectId,
      ref: 'Game'
    },
    player: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    type: {
      type: Number,
      ref: 'CharacterType'
    },
  });

  var Character = mongoose.model('Character', characterScheme);

  module.exports = Character;
}(require('mongoose')));
