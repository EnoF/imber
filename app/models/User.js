(function UserScope(angular, clazz) {
  'use strict';

  var app = angular.module('imber');

  app.factory('User', function UserFactory() {
    function User() {
      this.private = {
        userName: {
          getSet: null
        }
      };

      this.constructor = function constructor(user) {
        this.private.userName = user.userName;
      };
    }

    return clazz(User);
  });
}(window.angular, window.enofjs.clazz));