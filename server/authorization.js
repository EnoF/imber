(function authorizationScope(AES, HMAC, CryptoJS) {
  'use strict';

  module.exports = function authorize(req, res, next) {
    var unauthorizedPOSTS = [
      '/api/login',
      '/api/reauthenticate',
      '/api/user'
    ];
    if (unauthorizedPOSTS.indexOf(req.path) && req.method === 'POST') {
      next();
    } else {
      next();
    }
  };
}(require('crypto-js/aes'), ('crypto-js/hmac-sha256'), require('crypto-js')));
