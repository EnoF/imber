(function GameScope(mongoose) {
  'use strict';

  var Schema = mongoose.Schema;

  var gameSchema = new Schema({
    board: {
      type: Number,
      ref: 'Board',
      default: 0
    },
    challenger: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    opponent: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    started: {
      type: Boolean,
      default: false
    }
  });

  var Game = mongoose.model('Game', gameSchema);

  module.exports = Game;
}(require('mongoose')));
