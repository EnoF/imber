(function testHelperScope() {
  'use strict';
  var sinon = require('sinon');
  var queue = require('q');
  var chai = require('chai');
  var sinon = require('sinon');
  var sinonChai = require('sinon-chai');
  var expect = chai.expect;

  chai.Assertion.addMethod('user', function containsUser(id) {
    var arr = this._obj;
    for (var i = 0; i < arr.length; i++) {
      this.assert(arr[i].challenger._id.toString() === id || arr[i].opponent._id.toString() === id,
        'game ' + arr[i]._id + ' does not contain a challenger or opponent with id ' + id);
    }
  });

  chai.Assertion.addMethod('challenger', function containsChallenger(id) {
    var arr = this._obj;
    for (var i = 0; i < arr.length; i++) {
      this.assert(arr[i].challenger._id.toString() === id,
        'game ' + arr[i]._id + ' to contain challenger ' + id);
    }
  });

  chai.Assertion.addMethod('opponent', function containsOpponent(id) {
    var arr = this._obj;
    for (var i = 0; i < arr.length; i++) {
      this.assert(arr[i].opponent._id.toString() === id,
        'game ' + arr[i]._id + ' to contain opponent ' + id);
    }
  });

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
      givenParams: function givenParams(params) {
        testQueue = queue().then(function given() {
          req = req || {};
          req.params = params;
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
        testQueue = testQueue.then(function success(data) {
          if (!!req.header || !!req.path || !!req.method) {
            var response = res.send.called ? res.send.args[0][0] : null;
            return expectations(response, next, data);
          } else {
            expect(res.send).to.have.been.called;
            var response = res.send.args[0][0];
            return expectations(response, req, data);
          }
        });

        testQueue
          .fail(function unexpectedFail(error) {
            done('should not end up here');
          })
          .then(done)
          .catch(done);
        return testObject;
      },
      thenFail: function thenFail(expectations) {
        testQueue = testQueue.then(function unexpectedOk() {
          console.log('The request was unexpectedly successfull');
          done(new Error('unexpected'));
        });

        testQueue = testQueue.fail(function expectedFail(error) {
          expect(res.status).to.have.been.called.once;
          expect(res.send).to.have.been.called;
          var response = res.send.args[0][0];
          var status = res.status.args[0][0];
          expectations(response, status, next);
        });
        testQueue
          .then(done)
          .catch(done);
        return testObject;
      }
    };
    return testObject;
  };
}());
