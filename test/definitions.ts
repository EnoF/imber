module StepLibrary {
  var Yadda = require('yadda');
  var English = Yadda.localisation.English;
  var Dictionary = Yadda.Dictionary;

  var dictionary = new Dictionary()
    .define('NUM', /(\d+)/)
    .define('toBe', /(be|not be)/);

  String.prototype.toCamelCase = function() {
    return this.toLowerCase().replace(/ (.)/g, (match, firstLetter) => {
      return firstLetter.toUpperCase();
    });
  };

  String.prototype.toSnakeCase = function() {
    return this.replace(/ (.)|[A-Z]/g, function(capitalLetter: string, firstLetter: string) {
      var letter = firstLetter || capitalLetter.toLowerCase();
      return '-' + letter;
    });
  };

  export var library: ILibrary = English.library(dictionary);

  interface ILibrary {
    given(regex: string, testCode: Function): ILibrary;
    when(regex: string, testCode: Function): ILibrary;
    then(regex: string, testCode: Function): ILibrary;
  }

  class Context {
    $parent: any;
    $scope: IScopeVM;
    $httpBackend: ng.IHttpBackendService;
    $element: ng.IRootElementService;
    directive: string;
    attributes: Object = {};

    constructor() {
      this.renew();
    }

    renew() {
      inject(($rootScope: ng.IRootScopeService, $httpBackend: ng.IHttpBackendService) => {
        this.$parent = $rootScope.$new();
        this.$httpBackend = $httpBackend;
      });
    }

    initializeDirective(widget: string) {
      inject(($compile, $rootScope) => {
        this.setDirective(widget);
        var directive = angular.element(this.directive);
        var element = $compile(directive)(this.$parent);
        $rootScope.$apply();
        this.$element = $(element);
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

  export var ctx = new Context();

  interface IScopeVM extends ng.IScope {
    vm: any;
  }

  library
    .given('I provide "(.*)" as "(.*)"', function(value: string, attribute: string) {
      ctx.$scope.vm[attribute.toCamelCase()] = value;
    })
    .given('the widget "(.*)" is initialized', function(widget) {
      ctx.initializeDirective(widget);
    })
    .given('parent scope is initialized', function() {
      ctx.renew();
    })
    .when('I press the "(.*)" button', function(action) {
      ctx.$scope.vm[action.toCamelCase()]();
    });
}

interface String {
  toCamelCase(): string;
  toSnakeCase(): string;
}

interface JQuery {
  scope: any;
}
