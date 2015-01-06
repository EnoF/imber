(function GameScope(mongoose) {
  'use strict';

  var Schema = mongoose.Schema;
  var Character = require('./Character');
  var CharacterTypes = require('./CharacterType').CharacterTypes;
  var queue = require('q');

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

  function createDefaultTeam(gameId, playerId, isChallenger) {
    var team = [];
    addSoldiers(team, gameId, playerId, 1, 1, 8);
    return team;
  }

  function addNewCharacter(team, gameId, playerId, type) {
    return {
      game: gameId,
      player: playerId,
      type: type
    };
  }

  function addSoldiers(team, gameId, playerId, x, y, amount) {
    for (var i = 0; i < amount; i++) {
      var character = addNewCharacter(team, gameId, playerId, CharacterTypes.SOLDIER);
      character.position = {
        x: x + i,
        y: y
      };
      team.push(character);
    }
  }

  gameSchema.pre('save', function(next) {
    var challengerDeferred = queue.defer();
    var opponentDeferred = queue.defer();
    if (this.isNew) {
      Character.create(createDefaultTeam(this._id, this.challenger, true),
        challengerDeferred.makeNodeResolver());
      Character.create(createDefaultTeam(this._id, this.opponent, false),
        opponentDeferred.makeNodeResolver());
      queue.all([challengerDeferred.promise, opponentDeferred.promise])
        .then(function finishedCreation() {
          next();
        })
        .catch(next);
    } else {
      next();
    }
  });

  var Game = mongoose.model('Game', gameSchema);

  module.exports = Game;
}(require('mongoose')));
