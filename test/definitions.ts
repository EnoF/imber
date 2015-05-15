module StepLibrary {
  var Yadda = require('yadda');
  var English = Yadda.localisation.English;
  var Dictionary = Yadda.Dictionary;

  var dictionary = new Dictionary()
    .define('NUM', /(\d+)/)
    .define('toBe', /(be|not be)/);

  export var library: ILibrary = English.library(dictionary);

  interface ILibrary {
    given(regex: string, testCode: Function): ILibrary;
    when(regex: string, testCode: Function): ILibrary;
    then(regex: string, testCode: Function): ILibrary;
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
