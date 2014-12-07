(function userScope(mongoose, queue) {
  'use strict';

  var Schema = mongoose.Schema;

  var userSchema = new Schema({
    userName: String,
    password: String
  });

  var User = mongoose.model('User', userSchema);

  function login(req, res) {
    var user = new User(req.body);
    var deferred = queue.defer();
    user.save(deferred.makeNodeResolver());
    deferred.promise.then(function saveNewCall() {
      res.send({
        authToken: 'authToken',
        user: {
          userName: user.userName
        }
      });
    });
    return deferred.promise;
  }

  module.exports = {
    login: login
  };

}(require('mongoose'), require('q')));