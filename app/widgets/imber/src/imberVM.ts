module ImberVMS {
  import BaseVM = Models.BaseVM;
  import Session = Models.Session;
  import RouteParams = ng.route.IRouteParamsService;

  export class ImberVM extends BaseVM {
    static $inject = ['$scope', 'session', '$routeParams'];

    session: Session;
    $routeParams: RouteParams;

    constructor($scope, session, $routeParams) {
      this.session = session;
      this.$routeParams = $routeParams;

      super($scope);
    }
  }
}
