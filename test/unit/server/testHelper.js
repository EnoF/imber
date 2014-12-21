(function testHelperScope() {
  'use strict';
  var sinon = require('sinon');
  var queue = require('q');
  var chai = require('chai');
  var sinon = require('sinon');
  var sinonChai = require('sinon-chai');
  var expect = chai.expect;

  module.exports = function test(done) {
    var testQueue;
    var req;
    var isFailCase = false;
    var res = {
      send: sinon.spy(),
      status: sinon.stub()
    };
    res.status.returns({
      send: res.send
    });
    var next = sinon.spy();
    var testObject = {
      given: function given(body) {
        testQueue = queue().then(function given() {
          req = req || {};
          req.body = body;
          req.query = body;
        });
        return testObject;
      },
      givenHeader: function givenHeader(header) {
        testQueue = queue().then(function given() {
          req = req || {};
          req.header = function get(prop) {
            return header[prop];
          };
        });
        return testObject;
      },
      givenMethod: function givenMethod(method) {
        testQueue = queue().then(function given() {
          req = req || {};
          req.method = method;
        });
        return testObject;
      },
      givenPath: function givenPath(path) {
        testQueue = queue().then(function given() {
          req = req || {};
          req.baseUrl = path;
        });
        return testObject;
      },
      when: function when(fn) {
        testQueue = testQueue.then(function when() {
          return fn(req, res, next);
        });
        return testObject;
      },
      then: function then(expectations) {
        testQueue = testQueue.fail(function failure() {
          expect(res.status).to.have.been.called.once;
          expect(res.send).to.have.been.called;
          var response = res.send.args[0][0];
          var status = res.status.args[0][0];
          isFailCase = true;
          expectations(response, status, next);
        });
        testQueue = testQueue.then(function success(data) {
          if (isFailCase) return;
          if (!!req.header || !!req.path || !!req.method) {
            expectations(next);
          } else {
            expect(res.send).to.have.been.called;
            var response = res.send.args[0][0];
            expectations(response, req, data);
          }
        });
        testQueue = testQueue.then(done);
        testQueue.done();
        return testObject;
      }
    };
    return testObject;
  };
}());
