module LoginVMS {
  import UserDAO = DAO.UserDAO;
  import BaseVM = Models.BaseVM;

  export class LoginVM  extends BaseVM{
    static $inject = ['$scope', 'userDAO'];
    userName: string;
    password: string;

    constructor($scope, private userDAO: UserDAO) {
      super($scope);
    }

    login() {
      this.userDAO.login(this.userName, this.password);
    }
  }
}
