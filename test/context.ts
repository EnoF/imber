module StepLibrary {
  import Session = Models.Session;
  import IGame = Models.IGame;
  import IUser = Models.IUser;

  class Context {
    $parent: any;
    $scope: IScopeVM;
    $child: IScopeVM;
    $httpBackend: ng.IHttpBackendService;
    $element: ng.IRootElementService;
    $directive: any;
    session: Session;
    directive: string;
    attributes: Object = {};
    games: Array<IGame>;
    users: Array<IUser>;

    constructor() {
      this.renew();
    }

    renew() {
      inject(($rootScope: ng.IRootScopeService, $httpBackend: ng.IHttpBackendService,
        session: Session) => {
        this.$parent = $rootScope.$new();
        this.$httpBackend = $httpBackend;
        this.session = session;
        this.attributes = {};
        this.$scope = null;
        this.$child = null;
        this.$element = null;
        this.games = [];
        this.users = [];
      });
    }

    initializeDirective(widget: string) {
      inject(($compile, $rootScope) => {
        this.setDirective(widget);
        var directive = angular.element(this.directive);
        var element = $compile(directive)(this.$parent);
        $rootScope.$apply();
        this.$element = $(element);
        this.$directive = directive;
        this.$scope = directive.children().scope();
      });
    }

    setDirective(widget: string) {
      var html = '<' + widget.toSnakeCase();
      for (var i in this.attributes) {
        if (this.attributes.hasOwnProperty(i)) {
          html += ' ' + i.toSnakeCase() + '="' + this.attributes[i] + '"';
        }
      }
      this.directive = html + '></' + widget.toSnakeCase() + '>';
    }
  }

  interface IScopeVM extends ng.IScope {
    vm: any;
  }

  export var ctx = new Context();
}
