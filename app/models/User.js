(function UserScope(angular, clazz) {
  'use strict';

  var app = angular.module('imber');

  app.factory('User', function UserFactory() {
    function User() {
      this.private = {
        id: {
          get: null
        },
        userName: {
          getSet: null
        }
      };

      this.constructor = function constructor(user) {
        this.private.id = user._id || null;
        this.private.userName = user.userName;
      };
    }

    return clazz(User);
  });
}(window.angular, window.enofjs.clazz));
