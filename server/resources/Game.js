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
    addSymetric(team, gameId, playerId, 0, 0, CharacterTypes.LANCER);
    addSymetric(team, gameId, playerId, 1, 0, CharacterTypes.KNIGHT);
    addSymetric(team, gameId, playerId, 2, 0, CharacterTypes.ARCHER);
    addSymetric(team, gameId, playerId, 3, 0, CharacterTypes.MAGE);
    addNewCharacter(team, gameId, playerId, 4, 0, CharacterTypes.HERO);
    addNewCharacter(team, gameId, playerId, 5, 0, CharacterTypes.SAGE);
    return team;
  }

  function createOpponentTeam(gameId, playerId) {
    var team = [];
    addSoldiers(team, gameId, playerId, 0, 8, 10);
    addSymetric(team, gameId, playerId, 0, 9, CharacterTypes.LANCER);
    addSymetric(team, gameId, playerId, 1, 9, CharacterTypes.KNIGHT);
    addSymetric(team, gameId, playerId, 2, 9, CharacterTypes.ARCHER);
    addSymetric(team, gameId, playerId, 3, 9, CharacterTypes.MAGE);
    addNewCharacter(team, gameId, playerId, 4, 9, CharacterTypes.HERO);
    addNewCharacter(team, gameId, playerId, 5, 9, CharacterTypes.SAGE);
    return team;
  }

  function addNewCharacter(team, gameId, playerId, x, y, type) {
    team.push({
      game: gameId,
      player: playerId,
      type: type,
      position: {
        x: x,
        y: y
      }
    });
  }

  function addSoldiers(team, gameId, playerId, x, y, amount) {
    for (var i = 0; i < amount; i++) {
      addNewCharacter(team, gameId, playerId, x + i, y, CharacterTypes.SOLDIER);
    }
  }

  function addSymetric(team, gameId, playerId, x, y, type) {
    addNewCharacter(team, gameId, playerId, x, y, type);
    addNewCharacter(team, gameId, playerId, 9 - x, y, type);
  }

  function addDefaultTeams(game) {
    var challengerDeferred = queue.defer();
    var opponentDeferred = queue.defer();
    var deferred = queue.defer();
    Character.create(createChallengerTeam(game._id, game.challenger),
      challengerDeferred.makeNodeResolver());
    Character.create(createOpponentTeam(game._id, game.opponent),
      opponentDeferred.makeNodeResolver());
    queue.all([challengerDeferred.promise, opponentDeferred.promise])
      .then(function resolveWithGame() {
        deferred.resolve(game);
      })
      .catch(deferred.reject);
    return deferred.promise;
  }

  var Game = mongoose.model('Game', gameSchema);
  Game.addDefaultTeams = addDefaultTeams;

  module.exports = Game;
}(require('mongoose')));
