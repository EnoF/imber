(function testHelperScope() {
  'use strict';
  var sinon = require('sinon');
  var queue = require('q');

  module.exports = function test(done) {
    var testQueue;
    var req;
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
            body: body
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
        testQueue = testQueue.then(function success(data) {
          expectations(res, req, data);
        });
        testQueue = testQueue.fail(function failure(data) {
          expectations(res, req, data);
        });
        testQueue = testQueue.then(done);
        testQueue.done();
        return testObject;
      }
    };
    return testObject;
  };
}());
