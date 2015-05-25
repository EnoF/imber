module ChallengesVMS {
  import BaseVM = Models.BaseVM;
  import GameDAO = DAO.GameDAO;
  import Game = Models.Game;
  import Session = Models.Session;

  export class ChallengesVM extends BaseVM {
    static $inject = ['$scope', 'gameDAO', 'session'];

    challenges: Array<Game>;

    challengesForMe: Array<Game> = [];
    myChallenges: Array<Game> = [];
    myStartedChallenges: Array<Game> = [];
    globalChallenges: Array<Game> = [];
    globalStartedChallenges: Array<Game> = [];

    session: Session;

    constructor($scope, gameDAO: GameDAO, session: Session) {
      super($scope);
      this.session = session;

      gameDAO.getGames($scope.playerId)
        .then((challenges: Array<Game>) => {
          this.challenges = challenges;
          this.sortChallenges();
        });
    }

    sortChallenges() {
      var loggedInId = this.session.getUser()._id;
      this.challenges.forEach((challenge: Game) => {
        if (challenge.started &&
          (challenge.challenger._id === loggedInId ||
          challenge.opponent._id === loggedInId)) {
          this.myStartedChallenges.push(challenge);
        } else if (challenge.challenger._id === loggedInId) {
          this.challengesForMe.push(challenge);
        } else if (challenge.opponent._id === loggedInId) {
          this.myChallenges.push(challenge);
        } else if (challenge.started) {
          this.globalStartedChallenges.push(challenge);
        } else {
          this.globalChallenges.push(challenge);
        }
      });
    }
  }
}
