module ChallengesVMS {
  import BaseVM = Models.BaseVM;
  import Game = Models.Game;
  import Session = Models.Session;
  import GameDAO = DAO.GameDAO;

  export class ChallengeVM extends BaseVM {
    static $inject = ['$scope', 'session', 'gameDAO'];

    challenge: Game;
    session: Session;
    gameDAO: GameDAO;
    challengesVM: ChallengesVM;

    constructor($scope, session: Session, gameDAO: GameDAO) {
      super($scope);

      this.challenge = $scope.challenge;
      this.session = session;
      this.gameDAO = gameDAO;
    }

    accept() {
      this.gameDAO.acceptChallenge(this.challenge._id)
        .then(() => {
          this.challenge.started = true;
          this.challengesVM.sortChallenges();
        });
    }

    isInGame() {
      var loggedInId = this.session.getUser()._id;
      return this.challenge.opponent._id === loggedInId ||
        this.challenge.challenger._id === loggedInId;
    }

    isAuthorizedToAccept() {
      return this.challenge.opponent.userName === this.session.user.userName;
    }

    getOpponent() {
      if (this.challenge.opponent._id === this.session.getUser()._id) {
        return this.challenge.challenger;
      } else {
        return this.challenge.opponent;
      }
    }

    getChallenger() {
      if (this.challenge.opponent._id !== this.session.getUser()._id) {
        return this.challenge.challenger;
      } else {
        return this.challenge.opponent;
      }
    }
  }
}
