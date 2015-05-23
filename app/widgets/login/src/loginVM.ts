module LoginVMS {
  import UserDAO = DAO.UserDAO;
  import BaseVM = Models.BaseVM;

  export class LoginVM  extends BaseVM{
    static $inject = ['$scope', 'userDAO'];
    userName: string;
    password: string;
    email: string;
    $scope: any;

    constructor($scope, private userDAO: UserDAO) {
      super($scope);
      this.$scope = $scope;
    }

    login() {
      this.userDAO.login(this.userName, this.password);
    }

    register() {
      this.userDAO.register(this.email, this.userName, this.password);
    }
  }
}
