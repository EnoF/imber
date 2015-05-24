module Models {
  export class BaseVM {
    constructor($scope) {
      $scope.vm = $scope.vm || this;
      for (var prop in this) {
        if (!this.hasOwnProperty(prop)) {
          continue;
        }
        $scope.vm[prop] = this[prop];
      }
    }
  }
}
