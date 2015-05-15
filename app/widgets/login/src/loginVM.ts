module LoginVMS {
  import UserDAO = DAO.UserDAO;

  export class LoginVM {
    static $inject = ['$scope', 'userDAO'];
    userName: string;
    password: string;

    constructor($scope, private userDAO: UserDAO) {
      $scope.vm = this;
    }

    login() {
      this.userDAO.login(this.userName, this.password);
    }
  }
}
