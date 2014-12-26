(function gameScope(mongoose, queue, user, auth) {
  'use strict';

  var Game = require('./resources/Game');

  function accept(req, res) {
    var deferred = queue.defer();
    Game.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id), {
      $set: {
        started: true
      }
    }, deferred.makeNodeResolver());
    deferred.promise.then(resolveWithOk(res));
    return deferred.promise;
  }

  function challenge(req, res) {
    var deferred = queue.defer();
    var game = new Game(req.body);
    var challengerName = auth.extractUserName(req.header('authorization'));
    user.getUserById(req.body.challenger)
      .then(function playerFound(user) {
        if (challengerName === user.userName) {
          game.save(deferred.makeNodeResolver());
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
      .populate('challenger')
      .populate('opponent')
      .exec(deferred.makeNodeResolver());
    deferred.promise.then(function resolveWithGame(game) {
      res.send(game);
    });
    return deferred.promise;
  }

  function getLatestGames(req, res) {
    var deferred = queue.defer();
    Game.find()
      .populate('challenger')
      .populate('opponent')
      .limit(100)
      .exec(deferred.makeNodeResolver());
    deferred.promise.then(function resolveWithGames(games) {
      res.send(games);
    });
    return deferred.promise;
  }

  function resolveWithOk(res) {
    return function resolveOk() {
      res.send('ok');
    };
  }

  module.exports = {
    accept: accept,
    challenge: challenge,
    getGame: getGame,
    getLatestGames: getLatestGames
  };
}(require('mongoose'), require('q'), require('./user'), require('./authorization')));
