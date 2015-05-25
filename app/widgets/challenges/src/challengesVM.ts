module ChallengesVMS {
  import BaseVM = Models.BaseVM;
  import GameDAO = DAO.GameDAO;
  import UserDAO = DAO.UserDAO;
  import Game = Models.Game;
  import User = Models.User;
  import Session = Models.Session;

  export class ChallengesVM extends BaseVM {
    static $inject = ['$scope', 'gameDAO', 'userDAO', 'session'];
    VIEW: string = 'view';
    CREATION: string = 'creation';

    gameDAO: GameDAO;
    userDAO: UserDAO;
    challenges: Array<Game>;
    query: string;
    opponent: User;

    challengesForMe: Array<Game> = [];
    myChallenges: Array<Game> = [];
    myStartedChallenges: Array<Game> = [];
    globalChallenges: Array<Game> = [];
    globalStartedChallenges: Array<Game> = [];

    session: Session;
    state: string = this.VIEW;

    constructor($scope, gameDAO: GameDAO, userDAO: UserDAO, session: Session) {
      super($scope);
      this.session = session;
      this.gameDAO = gameDAO;
      this.userDAO = userDAO;
      gameDAO.getGames($scope.playerId)
        .then((challenges: Array<Game>) => {
          this.challenges = challenges;
          this.sortChallenges();
        });
    }

    challenge() {
      this.gameDAO.create(this.opponent._id)
        .then((game: Game) => {
          this.myChallenges.push(game);
          this.state = this.VIEW;
        });
    }

    resetChallenges() {
      this.challengesForMe = [];
      this.myChallenges = [];
      this.myStartedChallenges = [];
      this.globalChallenges = [];
      this.globalStartedChallenges = [];
    }

    sortChallenges() {
      var loggedInId = this.session.getUser()._id;
      this.resetChallenges();
      this.challenges.forEach((challenge: Game) => {
        if (challenge.started &&
          (challenge.challenger._id === loggedInId ||
          challenge.opponent._id === loggedInId)) {
          this.myStartedChallenges.push(challenge);
        } else if (challenge.challenger._id === loggedInId) {
          this.myChallenges.push(challenge);
        } else if (challenge.opponent._id === loggedInId) {
          this.challengesForMe.push(challenge);
        } else if (challenge.started) {
          this.globalStartedChallenges.push(challenge);
        } else {
          this.globalChallenges.push(challenge);
        }
      });
    }

    search(query: string) {
      return this.userDAO.search(query);
    }
  }
}
