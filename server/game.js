(function gameScope(mongoose, queue) {
  'use strict';

  var Schema = mongoose.Schema;

  var gameSchema = new Schema({
    challenger: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    opponent: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    started: Boolean
  });

  var Game = mongoose.model('Game', gameSchema);

  function accept(req, res) {
    var deferred = queue.defer();
    Game.findOne({
      _id: mongoose.Types.ObjectId(req.params.id)
    }, deferred.makeNodeResolver());
    deferred.promise.then(resolveWithOk(res));
    return deferred.promise;
  }

  function challenge(req, res) {
    var deferred = queue.defer();
    var game = new Game(req.body);
    game.save(deferred.makeNodeResolver());
    deferred.promise.then(resolveWithOk(res));
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
    Game: Game
  };
}(require('mongoose'), require('q')));
