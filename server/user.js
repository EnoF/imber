(function userScope(mongoose, queue, AES, HMAC, CryptoJS) {
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

  function createNewAuthToken(res, newUser, deferred) {
    return function createNewAuthToken(user) {
      // During the creation of a user, the user will be passed with
      // the initial function call.
      user = newUser || user;
      // User is not found
      if (user === null) {
        res.status(401).send('bad credentials');
        deferred.reject();
      } else {
        // Create a new authentication token
        res.send({
          authToken: createAuthToken(user.userName),
          user: {
            _id: user._id,
            userName: user.userName
          }
        });
        deferred.resolve();
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
    var loginDeferred = queue.defer();
    User.findOne({
      // Find username case insensitive.
      userName: {
        $regex: new RegExp('^' + req.body.userName + '$', 'i')
      },
      // HMAC the password so that we can match it with the encrypted password.
      password: HMAC(req.body.password, process.env.IMBER_HMAC_KEY).toString()
    }, deferred.makeNodeResolver());
    deferred.promise.then(createNewAuthToken(res, null, loginDeferred));
    return loginDeferred.promise;
  }

  function reauthenticate(req, res) {
    var deferred = queue.defer();
    try {
      // Extracting the username will throw an error when
      // the token is too old or tampered by a hacker.
      var userName = extractUserName(req.body.authToken);
      User.findOne({
        userName: userName
      }, deferred.makeNodeResolver());
      deferred.promise.then(createNewAuthToken(res));
    } catch (error) {
      // In case the user is no hacker, we want to tell the user
      // the token is too old.
      res.status(401).send('old token');
      deferred.reject();
    }
    return deferred.promise;
  }

  function register(req, res) {
    var deferred = queue.defer();
    // Check if the provided registration details are valid.
    isValidRegistration(req.body, deferred);
    // Encrypt the password before we store an unencrypted password!
    req.body.password = HMAC(req.body.password,
      process.env.IMBER_HMAC_KEY).toString();
    var newUser = new User(req.body);
    // Check if the user has a conflicting username or email with an other user.
    isUserDetailConflicting(req.body.userName, req.body.email)
      .then(checkExistance(newUser, deferred));
    // When registered successful we can directly log the user in.
    deferred.promise.then(createNewAuthToken(res, newUser));
    // When for what ever reason the registration was rejected,
    // send a proper response.
    deferred.promise.fail(sendRegistrationInvalid(req, res, newUser));
    return deferred.promise;
  }

  function checkExistance(newUser, deferred) {
    return function noSuchUser(user) {
      // There is no conflicting user found!
      if (user === null) {
        // Create the new user.
        newUser.save(deferred.makeNodeResolver());
      } else {
        deferred.reject();
      }
    };
  }

  function sendRegistrationInvalid(req, res, user) {
    return function registrationIsInvalid() {
      // User can't be used.
      res.status(410).send({
        userName: user.userName === req.body.userName,
        email: user.email === req.body.email
      });
    };
  }

  function isValidRegistration(details, deferred) {
    // All properties must be set!
    if (!details.userName || !details.password || !details.email) {
      deferred.reject();
    }
  }

  function isUserDetailConflicting(userName, email) {
    var deferred = queue.defer();
    // Search for any conflicting users in the db.
    User.findOne({
      $or: [{
        userName: userName
      }, {
        email: email
      }]
    }, deferred.makeNodeResolver());
    return deferred.promise;
  }

  function search(req, res) {
    var deferred = queue.defer();
    var findDeferred = queue.defer();
    // Find the user close to the provided name
    var name = req.query.search;
    User.find({
        userName: new RegExp('^' + name, 'i')
      })
      .select('userName')
      .limit(5)
      .exec(findDeferred.makeNodeResolver());
    findDeferred.promise.then(handleFindResults(res, deferred));
    return deferred.promise;
  }

  function handleFindResults(res, deferred) {
    return function sendFindResults(result) {
      if (!result || (result instanceof Array && result.length === 0)) {
        // when there are no results found
        res.status(404).send('not found');
        deferred.reject();
      } else {
        // otherwise send the result
        res.send(result);
        deferred.resolve();
      }
    };
  }

  function find(req, res) {
    var deferred = queue.defer();
    var findDeferred = queue.defer();
    // Find the user close to the provided name
    var name = req.query.find;
    User.findOne({
        userName: new RegExp('^' + name + '$', 'i')
      })
      .select('userName')
      .exec(findDeferred.makeNodeResolver());
    findDeferred.promise.then(handleFindResults(res, deferred));
    return deferred.promise;
  }

  // Internal function to perform actions on a user.
  function getUserById(id) {
    var deferred = queue.defer();
    var findDeferred = queue.defer();
    User.findOne({
      _id: mongoose.Types.ObjectId(id)
    }, findDeferred.makeNodeResolver());
    findDeferred.promise.then(resolveOnlyWhenFound(deferred));
    return deferred.promise;
  }

  function resolveOnlyWhenFound(deferred) {
    return function checkUser(user) {
      if (!!user) {
        deferred.resolve(user);
      } else {
        deferred.reject();
      }
    };
  }

  function searchFor(req, res) {
    if (!!req.query.search) {
      return search(req, res);
    } else {
      return find(req, res);
    }
  }

  module.exports = {
    find: find,
    getUserById: getUserById,
    login: login,
    reauthenticate: reauthenticate,
    register: register,
    search: search,
    searchFor: searchFor,
    User: User
  };

}(require('mongoose'), require('q'), require('crypto-js/aes'),
  require('crypto-js/hmac-sha256'), require('crypto-js')));
