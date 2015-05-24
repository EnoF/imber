module LoginVMS {
  import UserDAO = DAO.UserDAO;
  import BaseVM = Models.BaseVM;
  import Media = angular.material.MDMedia;

  export class LoginVM  extends BaseVM{
    static $inject = ['$scope', 'userDAO', '$mdMedia'];
    SELECT: string = 'select';
    LOGIN: string = 'login';
    REGISTER: string = 'register';

    userName: string;
    password: string;
    email: string;
    state: string = this.SELECT;
    $scope: any;
    $mdMedia: Media;

    constructor($scope, private userDAO: UserDAO, $mdMedia: Media) {
      super($scope);
      $scope.$mdMedia = $mdMedia;
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
