(function gameDAOModelScope(angular, clazz) {
  'use strict';

  var app = angular.module('imber');

  app.factory('gameDAO', function gameDAOScope($http, $q, Game, userDAO) {
    function gameDAO() {
      this.public = {
        challenge: function challenge(opponent) {
          var currentUser = userDAO.getCurrentUser();
          return $http.post('/api/games', {
            challenger: currentUser.getId(),
            opponent: opponent.getId()
          });
        },
        getGame: function getGame(id) {
          var deferred = $q.defer();
          $http.get('/games/' + id)
            .then(function resolveGame(response) {
              deferred.resolve(new Game(response.data));
            });
          return deferred.promise;
        }
      };
    }

    // Return the singleton.
    var GameDAO = clazz(gameDAO);
    return new GameDAO();
  });
}(window.angular, window.enofjs.clazz));
