(function authorizationSpecsScope() {
  'use strict';

  describe('authorization specs', function authorizationSpecs() {

    var chai = require('chai');
    var sinon = require('sinon');
    var sinonChai = require('sinon-chai');
    var expect = chai.expect;
    chai.use(sinonChai);
    var test = require('./testHelper.js');

    var authorization = require('../../../server/authorization');

    it('should authorize any call before calling the caller', function authorize() {

    });

    it('should send a 401 when not authorized succesful', function notAuthorized() {

    });

    it('should directly forward calls when going to login', function unsecure() {

    });

    it('should limit the unsecure resources to the POSTS', function limitToPosts() {

    });
  });
}());
