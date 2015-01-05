// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function apiMocksScope(mongoose, queue, HMAC) {
  'use strict';

  var users = [{
    _id: '545726928469e940235ce769',
    userName: 'EnoF',
    password: createPassword('someEncryptedPassword'),
    email: 'andyt@live.nl'
  }, {
    _id: '545726928469e940235ce853',
    userName: 'Banana',
    password: createPassword('someEncryptedPassword'),
    email: 'ban@a.na'
  }, {
    _id: '142526928469e940235ce853',
    userName: 'Ban Hammer',
    password: createPassword('someEncryptedPassword'),
    email: 'ban@ham.mer'
  }, {
    _id: '1425949284123440235ce853',
    userName: 'Banana King',
    password: createPassword('someEncryptedPassword'),
    email: 'ban@ana.king'
  }];

  var games = [{
    _id: '548726928469e940235ce769',
    challenger: '545726928469e940235ce769',
    opponent: '545726928469e940235ce853'
  }, {
    _id: '123726928469e940235ce769',
    challenger: '545726928469e940235ce769',
    opponent: '545726928469e940235ce853'
  }, {
    _id: '124231928469e940235ce769',
    challenger: '1425949284123440235ce853',
    opponent: '142526928469e940235ce853'
  }, {
    _id: '444726928469e940235ce769',
    challenger: '545726928469e940235ce853',
    opponent: '545726928469e940235ce769'
  }];

  var characters = [{
    _id: '548726928469e940555ce987',
    game: '548726928469e940235ce769',
    player: '545726928469e940235ce769',
    type: 0
  }, {
    _id: '543216928469e940555ce987',
    game: '548726928469e940235ce769',
    player: '545726928469e940235ce853',
    type: 0
  }];

  var boards = [{
    _id: 0,
    x: 10,
    y: 10
  }];

  var types = [{
    _id: 0,
    name: 'Soldier'
  }, {
    _id: 1,
    name: 'Knight'
  }, {
    _id: 2,
    name: 'Mage'
  }, {
    _id: 3,
    name: 'Archer'
  }, {
    _id: 4,
    name: 'Lancer'
  }, {
    _id: 5,
    name: 'Hero'
  }, {
    _id: 6,
    name: 'Sage'
  }];

  function createPassword(password) {
    return HMAC(password,
      process.env.IMBER_HMAC_KEY).toString();
  }

  function mocks(done) {
    var allMocks = [
      createMocks('User', users),
      createMocks('CharacterType', types),
      createMocks('Character', characters),
      createMocks('Game', games),
      createMocks('Board', boards)
    ];

    queue.all(allMocks)
      .then(function itsDone() {
        done();
      })
      .catch(done);
  }

  function createMocks(model, mocks) {
    var allMocksCreated = queue.defer();
    var Model = mongoose.model(model);
    var allPromisses = [];

    for (var i = 0; i < mocks.length; i++) {
      var data = mocks[i];
      var deferred = queue.defer();
      Model.create(data, deferred.makeNodeResolver());
      allPromisses.push(deferred);
    }

    queue.all(allPromisses)
      .then(function resolve() {
        allMocksCreated.resolve();
      })
      .fail(function reject() {
        allMocksCreated.reject()
      });
    return allMocksCreated.promise;
  }

  module.exports = mocks;
}(require('mongoose'), require('q'), require('crypto-js/hmac-sha256')));
