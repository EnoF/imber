(function authorizationScope(AES, HMAC, CryptoJS, queue) {
  'use strict';

  // Require user model
  var User = require('./user').User;

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

  function reauthenticate(req, res, next) {
    var deferred = queue.defer();
    try {
      // Extracting the username will throw an error when
      // the token is too old or tampered by a hacker.
      var userName = extractUserName(req.header('authorization'));
      User.findOne({
        userName: new RegExp('^' + userName + '$', 'i')
      }, deferred.makeNodeResolver());
      deferred.promise.then(function continueCall(user) {
        next();
      });
    } catch (error) {
      // In case the user is no hacker, we want to tell the user
      // the token is too old.
      res.status(401).send('old token');
      deferred.reject();
    }
    return deferred.promise;
  }

  module.exports = function authorize(req, res, next) {
    var unauthorizedPOSTS = [
      '/api/login',
      '/api/reauthenticate',
      '/api/user'
    ];
    if (unauthorizedPOSTS.indexOf(req.baseUrl) !== -1 && req.method === 'POST') {
      next();
      var deferred = queue.defer();
      deferred.resolve();
      return deferred.promise;
    } else {
      return reauthenticate(req, res, next);
    }
  };
}(require('crypto-js/aes'), ('crypto-js/hmac-sha256'), require('crypto-js'), require('q')));
