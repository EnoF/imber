module DAO {
  import IInjectorService = ng.auto.IInjectorService;
  import Game = Models.Game;
  import IGame = Models.IGame;

  export class GameDAO extends DAO {
    constructor($injector: IInjectorService) {
      super($injector);
    }

    getGames(player: string) {
      var deferred = this.$q.defer();
      this.get('/api/games', {
        player: player
      }).then((response: any) => {
          var games: Array<Game> = [];
          response.data.forEach((game: IGame) => {
            games.push(new Game(game));
          });
          deferred.resolve(games);
        }, deferred.reject);
      return deferred.promise;
    }

    create(opponent: string) {
      var deferred = this.$q.defer();
      var game = {
        challenger: this.session.getUser()._id,
        opponent: opponent
      };
      this.post('/api/games', game)
        .then((response: any) => {
          deferred.resolve(new Game(response.data));
        }, deferred.reject);
      return deferred.promise;
    }
  }

  export function gameDAO($injector: IInjectorService) {
    return new GameDAO($injector);
  }
  gameDAO.$inject = ['$injector'];
}
