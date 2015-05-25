(function gameScope(mongoose, queue, user, auth) {
  'use strict';

  var Game = require('./resources/Game');
  var Character = require('./resources/Character');
  // Required so the schema is defined.
  require('./resources/Board');
  require('./resources/CharacterType');
  require('./resources/Character');

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
    var challengerName = auth.extractUserName(req.header('authorization'));
    user.getUserById(req.body.challenger)
      .then(function playerFound(user) {
        if (challengerName === user.userName) {
          return Game.create(req.body);
        } else {
          res.status(403).send('not authorized');
          deferred.reject();
        }
      })
      .then(function sendGame(game) {
        return Game.findOne({
            _id: game._id
          })
          .populate('board')
          .populate('challenger', '_id userName')
          .populate('opponent', '_id userName')
          .exec();
      })
      .then(populateTeams)
      .then(function resolveGame(game) {
        res.send(game);
        deferred.resolve(game);
      })
      .fail(function playerNotFound(error) {
        res.status(404).send('challenger not found');
        deferred.reject();
      });
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

  module.exports = {
    accept: accept,
    challenge: challenge,
    getGame: getGame,
    getLatestGames: getLatestGames
  };
}(require('mongoose'), require('q'), require('./user'), require('./authorization')));
