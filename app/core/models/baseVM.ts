module Models {
  export class BaseVM {
    constructor($scope) {
      $scope.vm = $scope.vm || this;
      angular.forEach(this, (value, prop) => {
        this[prop] = value;
      });
    }
  }
}
