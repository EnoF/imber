(function userScope(mongoose, queue, AES, CryptoJS) {
  'use strict';

  var Schema = mongoose.Schema;

  var userSchema = new Schema({
    userName: String,
    password: String,
    email: String
  });

  var User = mongoose.model('User', userSchema);

  function createAuthToken(message) {
    // The authentication token is based on the user name
    // and the epoch combined
    var authToken = AES.encrypt(message + ';' +
      new Date().getTime(), process.env.IMBER_AES_KEY);
    return authToken.toString();
  }

  function createNewAuthToken(res, newUser) {
    return function createNewAuthToken(user) {
      // During the creation of a user, the user will be passed with
      // the initial function call.
      user = newUser || user;
      // User is not found
      if (user === null) {
        res.status(401).send('bad credentials');
      } else {
        // Create a new authentication token
        res.send({
          authToken: createAuthToken(user.userName),
          user: {
            userName: user.userName
          }
        });
      }
    };
  }

  function extractUserName(authToken) {
    // Extract the user name from the auth token.
    var decryptedMessage = AES.decrypt(authToken, process.env.IMBER_AES_KEY);
    var brokenMessage = decryptedMessage.toString(CryptoJS.enc.Utf8).split(';');
    var nineDaysAgo = new Date();
    nineDaysAgo.setDate(nineDaysAgo.getDate() - 9);
    var tokenDate = new Date(parseInt(brokenMessage[1], 10));
    if (brokenMessage.length !== 2 || tokenDate < nineDaysAgo) {
      throw new Error('AuthenticationFailed');
    }
    return brokenMessage[0];
  }

  function login(req, res) {
    var deferred = queue.defer();
    User.findOne({
      userName: {
        $regex: new RegExp('^' + req.body.userName + '$', 'i')
      },
      password: req.body.password
    }, deferred.makeNodeResolver());
    deferred.promise.then(createNewAuthToken(res));
    return deferred.promise;
  }

  function reauthenticate(req, res) {
    var deferred = queue.defer();
    try {
      var userName = extractUserName(req.body.authToken);
      User.findOne({
        userName: userName
      }, deferred.makeNodeResolver());
      deferred.promise.then(createNewAuthToken(res));
    } catch (error) {
      res.status(401).send('old token');
      deferred.reject();
    }
    return deferred.promise;
  }

  function register(req, res) {
    var deferred = queue.defer();
    var newUser = new User(req.body);
    isUserDetailConflicting(req.body.userName, req.body.email).
      then(function checkExistance(user) {
        // There is no conflicting user found!
        if (user === null) {
          // Create the new user.
          newUser.save(deferred.makeNodeResolver());
        } else {
          // User can't be used.
          res.status(410).send({
            userName: user.userName === req.body.userName,
            email: user.email === req.body.email
          });
          deferred.reject();
        }
      });
    deferred.promise.then(createNewAuthToken(res, newUser));
    return deferred.promise;
  }

  function isUserDetailConflicting(userName, email) {
    var deferred = queue.defer();
    User.findOne({
      $or: [
        {
          userName: userName
        },
        {
          email: email
        }
      ]
    }, deferred.makeNodeResolver());
    return deferred.promise;
  }

  module.exports = {
    login: login,
    reauthenticate: reauthenticate,
    register: register
  };

}(require('mongoose'), require('q'), require('crypto-js/aes'), require('crypto-js')));