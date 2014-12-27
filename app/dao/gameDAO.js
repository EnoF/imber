(function gameDAOModelScope(angular, clazz) {
  'use strict';

  var app = angular.module('imber');

  app.factory('gameDAO', function gameDAOScope($http, $q, Game, userDAO) {
    function gameDAO() {
      this.private = {
        resolveGames: function resolveGames(deferred) {
          return function foundGamesresponse(response) {
            var games = [];
            for (var i = 0; i < response.data.length; i++) {
              games.push(new Game(response.data[i]));
            }
            deferred.resolve(games);
          };
        }
      }

      this.public = {
        accept: function accept(id) {
          return $http.post('/api/games/' + id + '/accept');
        },
        challenge: function challenge(opponent) {
          var currentUser = userDAO.getCurrentUser();
          return $http.post('/api/games', {
            challenger: currentUser.getId(),
            opponent: opponent.getId()
          });
        },
        getGame: function getGame(id) {
          var deferred = $q.defer();
          $http.get('/api/games/' + id)
            .then(function resolveGame(response) {
              deferred.resolve(new Game(response.data));
            });
          return deferred.promise;
        },
        getGames: function getGames(query) {
          var deferred = $q.defer();
          $http.get('/api/games', {
            params: query || null
          }).then(this.private.resolveGames(deferred));
          return deferred.promise;
        },
        getGamesOfUser: function getGamesOfUser(user) {
          return this.public.getGames({
            user: user.getId()
          });
        },
        getGamesWithChallenger: function getGamesWithChallenger(challenger) {
          return this.public.getGames({
            challenger: challenger.getId()
          });
        },
        getGamesWithOpponent: function getGamesWithOpponent(opponent) {
          return this.public.getGames({
            opponent: opponent.getId()
          });
        }
      };
    }

    // Return the singleton.
    var GameDAO = clazz(gameDAO);
    return new GameDAO();
  });
}(window.angular, window.enofjs.clazz));
