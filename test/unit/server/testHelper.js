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
    var testObject = {
      given: function given(body) {
        testQueue = queue().then(function given() {
          req = {
            body: body,
            query: body
          };
        });
        return testObject;
      },
      when: function when(fn) {
        testQueue = testQueue.then(function when() {
          return fn(req, res);
        });
        return testObject;
      },
      then: function then(expectations) {
        testQueue = testQueue.fail(function failure(data) {
          expect(res.status).to.have.been.called.once;
          expect(res.send).to.have.been.called;
          var response = res.send.args[0][0];
          var status = res.status.args[0][0];
          isFailCase = true;
          expectations(response, status, data);
        });
        testQueue = testQueue.then(function success(data) {
          if (!isFailCase) {
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
