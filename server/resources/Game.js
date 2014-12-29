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

  gameSchema.pre('init', function defaultBoard(next) {
    // Make sure board is set.
    if (isNaN(this.board)) {
      this.board = 0;
    }
    next();
  });

  var Game = mongoose.model('Game', gameSchema);

  module.exports = Game;
}(require('mongoose')));
