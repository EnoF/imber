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

  function createChallengerTeam(gameId, playerId) {
    var team = [];
    addSoldiers(team, gameId, playerId, 0, 1, 10);
    addSymetric(team, gameId, playerId, 1, 0, CharacterTypes.KNIGHT);
    addSymetric(team, gameId, playerId, 2, 0, CharacterTypes.ARCHER);
    addSymetric(team, gameId, playerId, 3, 0, CharacterTypes.MAGE);
    return team;
  }

  function createOpponentTeam(gameId, playerId) {
    var team = [];
    addSoldiers(team, gameId, playerId, 0, 8, 10);
    addSymetric(team, gameId, playerId, 1, 9, CharacterTypes.KNIGHT);
    addSymetric(team, gameId, playerId, 2, 9, CharacterTypes.ARCHER);
    addSymetric(team, gameId, playerId, 3, 9, CharacterTypes.MAGE);
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

  function addSymetric(team, gameId, playerId, x, y, type) {
    var character = addNewCharacter(team, gameId, playerId, type);
    character.position = {
      x: x,
      y: y
    };
    team.push(character);
    var symetricCharacter = addNewCharacter(team, gameId, playerId, type);
    symetricCharacter.position = {
      x: 9 - x,
      y: y
    };
    team.push(symetricCharacter);
  }

  gameSchema.pre('save', function(next) {
    var challengerDeferred = queue.defer();
    var opponentDeferred = queue.defer();
    if (this.isNew) {
      Character.create(createChallengerTeam(this._id, this.challenger),
        challengerDeferred.makeNodeResolver());
      Character.create(createOpponentTeam(this._id, this.opponent),
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
