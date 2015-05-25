module ChallengesVMS {
  import BaseVM = Models.BaseVM;
  import GameDAO = DAO.GameDAO;
  import Game = Models.Game;

  export class ChallengesVM extends BaseVM {
    static $inject = ['$scope', 'gameDAO'];

    challenges: Array<Game>;

    constructor($scope, gameDAO: GameDAO) {
      super($scope);

      gameDAO.getGames($scope.playerId)
        .then((challenges: Array<Game>) => {
          this.challenges = challenges;
        });
    }
  }
}
