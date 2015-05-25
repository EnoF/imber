module ChallengesVMS {
  import BaseVM = Models.BaseVM;
  import Game = Models.Game;
  import Session = Models.Session;

  export class ChallengeVM extends BaseVM {
    static $inject = ['$scope', 'session'];

    challenge: Game;
    session: Session;

    constructor($scope, session: Session) {
      super($scope);

      this.challenge = $scope.challenge;
      this.session = session;
    }

    isInGame() {
      var loggedInId = this.session.getUser()._id;
      return this.challenge.opponent._id === loggedInId ||
        this.challenge.challenger._id === loggedInId;
    }

    getOpponent() {
      if (this.challenge.opponent._id === this.session.getUser()._id) {
        return this.challenge.challenger;
      } else {
        return this.challenge.opponent;
      }
    }

    getChallenger() {
      if (this.challenge.challenger._id === this.session.getUser()._id) {
        return this.challenge.challenger;
      } else {
        return this.challenge.opponent;
      }
    }
  }
}
