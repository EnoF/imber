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

  function createDefaultTeam(gameId, playerId) {
    var team = [];
    addNewCharacter(team, gameId, playerId, CharacterTypes.SOLDIER, 8);
    addNewCharacter(team, gameId, playerId, CharacterTypes.KNIGHT, 2);
    addNewCharacter(team, gameId, playerId, CharacterTypes.MAGE, 2);
    addNewCharacter(team, gameId, playerId, CharacterTypes.LANCER, 2);
    addNewCharacter(team, gameId, playerId, CharacterTypes.HERO, 1);
    addNewCharacter(team, gameId, playerId, CharacterTypes.SAGE, 1);
    return team;
  }

  function addNewCharacter(team, gameId, playerId, type, amount) {
    for (var i = 0; i < amount; i++) {
      team.push({
        game: gameId,
        player: playerId,
        type: type
      });
    }
  }

  gameSchema.pre('save', function(next) {
    var challengerDeferred = queue.defer();
    var opponentDeferred = queue.defer();
    if (this.isNew) {
      Character.create(createDefaultTeam(this._id, this.challenger),
        challengerDeferred.makeNodeResolver());
      Character.create(createDefaultTeam(this._id, this.opponent),
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
