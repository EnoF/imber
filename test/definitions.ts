module StepLibrary {
  var Yadda = require('yadda');
  var English = Yadda.localisation.English;
  var Dictionary = Yadda.Dictionary;
  var expect = chai.expect;

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
    .given('I provide "(.*)" as "(.*)"', (value: string, attribute: string) => {
      ctx.$scope.vm[attribute.toCamelCase()] = value;
    })
    .given('the widget "(.*)" is initialized', (widget) => {
      ctx.initializeDirective(widget);
    })
    .given('the widget has bound "(.*)" with "(.*)"', (prop: string, value: string) => {
      ctx.attributes[prop] = value;
    })
    .given('I am logged in as "(.*)"', (name: string) => {
      ctx.session.setUser({
        _id: name.toFakeId(),
        userName: name
      });
    })
    .when('I press the "(.*)" button', (action) => {
      ctx.$scope.vm[action.toCamelCase()]();
    })
    .when('the server responds', () => ctx.$httpBackend.flush())
    .then('I should see I am logged in with "(.*)"', () => {

    })
    .then('I should see the error message "(.*)"', (message: string) => {

    });
}
