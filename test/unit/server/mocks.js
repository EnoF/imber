// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function apiMocksScope(mongoose, user, queue) {
  'use strict';

  var users = [
    {
      _id: '545726928469e940235ce769',
      userName: 'EnoF',
      password: 'someEncryptedPassword',
      email: 'andyt@live.nl'
    }
  ];

  function mocks(done) {

    var User = mongoose.model('User');
    var allPromisses = [];

    for (var i = 0; i < users.length; i++) {
      var data = users[i];
      var deferred = queue.defer();
      User.create(data, deferred.makeNodeResolver());
      allPromisses.push(deferred);
    }

    queue.all(allPromisses).
      then(function resolve() {
        done();
      }).
      catch(done);
  }


  module.exports = mocks;
}(require('mongoose'), require('../../../server/user.js'), require('q')));
