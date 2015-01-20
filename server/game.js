(function gameScope(mongoose, queue, user, auth) {
  'use strict';

  var Game = require('./resources/Game');
  var Character = require('./resources/Character');
  // Required so the schema is defined.
  var Board = require('./resources/Board');
  var CharacterType = require('./resources/CharacterType');
  require('./resources/Character');

  function accept(req, res) {
    return Game.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id), {
        $set: {
          started: true
        }
      }).exec()
      .then(resolveWithOk(res));
  }

  function challenge(req, res) {
    var deferred = queue.defer();
    var challengerName = auth.extractUserName(req.header('authorization'));
    user.getUserById(req.body.challenger)
      .then(function playerFound(user) {
        if (challengerName === user.userName) {
          req.body.turn = req.body.challenger;
          Game.create(req.body)
            .then(Game.addDefaultTeams)
            .then(deferred.resolve,
              deferred.reject);
        } else {
          res.status(403).send('not authorized');
          deferred.reject();
        }
      })
      .fail(function playerNotFound() {
        res.status(404).send('challenger not found');
        deferred.reject();
      });
    deferred.promise.then(resolveWithOk(res));
    return deferred.promise;
  }

  function getGame(req, res) {
    var deferred = queue.defer();
    Game.findOne({
        _id: mongoose.Types.ObjectId(req.params.id)
      })
      .populate('board')
      .populate('challenger', '_id userName')
      .populate('opponent', '_id userName')
      .exec()
      .then(populateTeams)
      .then(function resolveGame(game) {
        res.send(game);
        deferred.resolve(game);
      });
    return deferred.promise;
  }

  function populateTeams(game) {
    game = game.toObject();
    var challenger = Character.find({
        game: game._id,
        player: game.challenger._id
      })
      .populate('type')
      .exec();
    var opponent = Character.find({
        game: game._id,
        player: game.opponent._id
      })
      .populate('type')
      .exec();
    var deferred = queue.defer();
    queue.all([challenger, opponent])
      .then(function populate(responses) {
        game.challenger.team = responses[0];
        game.opponent.team = responses[1];
        deferred.resolve(game);
      });
    return deferred.promise;
  }

  function getLatestGames(req, res) {
    var deferred = queue.defer();
    var findQuery = Game.find()
      .populate('board')
      .populate('challenger', '_id userName')
      .populate('opponent', '_id userName')
      .limit(100);
    addSearchCriteria(req, findQuery);
    findQuery.exec(deferred.makeNodeResolver());
    deferred.promise.then(function resolveWithGames(games) {
      res.send(games);
    });
    return deferred.promise;
  }

  function addSearchCriteria(req, query) {
    if (!!req.query.user) {
      query.or([{
        challenger: mongoose.Types.ObjectId(req.query.user)
      }, {
        opponent: mongoose.Types.ObjectId(req.query.user)
      }]);
    } else if (!!req.query.challenger) {
      query.where('challenger').equals(mongoose.Types.ObjectId(req.query.challenger));
    } else if (!!req.query.opponent) {
      query.where('opponent').equals(mongoose.Types.ObjectId(req.query.opponent));
    }
  }

  function resolveWithOk(res) {
    return function resolveOk() {
      res.send('ok');
    };
  }

  function moveCharacter(req, res) {
    return Character.findById(mongoose.Types.ObjectId(req.body.character))
      .populate('game')
      .populate('player', '_id userName')
      .exec()
      .then(function validateMovement(character) {
        return isMovementAllowed(character, req.body);
      })
      .then(function validateBlocked(character) {
        return isBlocked(character, req.body);
      })
      .then(function checkUser(character) {
        return isUserAllowed(auth.extractUserName(req.header('authorization')), character);
      })
      .then(function consumeEnergyOfPlayer(character) {
        return consumeEnergy(character, req.body);
      })
      .then(function updatePosition(character) {
        character.position.x = req.body.x;
        character.position.y = req.body.y;
        return character.save();
      })
      .then(function movedTheCharacter() {
        res.send('ok');
      }, function reject(reason) {
        res.status(403).send(reason.message);
        throw reason;
      });
  }

  function isBlocked(character, newPos) {
    return Character.find({
        game: character.game,
        position: buildIsBlockedQuery(character.position, newPos)
      })
      .exec()
      .then(function foundAnyBlockers(blockers) {
        if (blockers.length > 0) {
          throw new Error('path is blocked');
        } else {
          return character;
        }
      });
  }

  function buildIsBlockedQuery(posChar, posNew) {
    var query = {};
    buildBlockQueryDirection(query, 'x', posChar, posNew);
    buildBlockQueryDirection(query, 'y', posChar, posNew);
    return query;
  }

  function buildBlockQueryDirection(query, direction, posChar, posNew) {
    if (posChar[direction] === posNew[direction]) {
      // not moving in given direction
      query[direction] = posChar[direction];
    } else {
      // moving in given direction
      query[direction] = {
        $gt: posChar[direction] > posNew[direction] ? posNew[direction] : posChar[direction],
        $lte: posChar[direction] < posNew[direction] ? posNew[direction] : posChar[direction]
      };
    }
  }

  function consumeEnergy(character, posNew) {
    var distance = Math.abs(character.position.x - posNew.x) +
      Math.abs(character.position.y - posNew.y);
    return populateType(character)
      .then(function calculateConsumption(type) {
        var energyConsumption = distance * type.stats.moveConsumption;
        if (character.game.energy <= energyConsumption) {
          throw new Error('not enough energy');
        }
        return Game.findByIdAndUpdate(character.game, {
            energy: character.game.energy - energyConsumption
          })
          .exec();
      })
      .then(function updatedGame() {
        return character;
      });
  }

  function isMovementAllowed(character, posNew) {
    return Board.findById(character.game.board)
      .exec()
      .then(function checkPosition(board) {
        if (!isOnBoard(posNew, board) ||
          (!isInLine(character.position, posNew) &&
            !isDiagonal(character.position, posNew))) {
          throw new Error('not allowed');
        } else {
          return character;
        }
      });
  }

  function isInLine(posChar, posNew) {
    return posChar.x === posNew.x || posChar.y === posNew.y;
  }

  function isDiagonal(posChar, posNew) {
    var x = Math.abs(posChar.x - posNew.x);
    var y = Math.abs(posChar.y - posNew.y);
    return x === y;
  }

  function isOnBoard(posNew, boardSize) {
    return posNew.x >= 0 && posNew.y >= 0 &&
      posNew.x < boardSize.x && posNew.y < boardSize.y;
  }

  function isUserAllowed(userName, character) {
    if (character.player.userName !== userName ||
      !character.game.turn.equals(character.player._id)) {
      throw new Error('not allowed');
    } else {
      return character;
    }
  }

  function populateType(character) {
    return CharacterType.findById(character.type)
      .exec();
  }

  module.exports = {
    accept: accept,
    challenge: challenge,
    getGame: getGame,
    getLatestGames: getLatestGames,
    moveCharacter: moveCharacter
  };
}(require('mongoose'), require('q'), require('./user'), require('./authorization')));
