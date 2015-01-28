module.exports = (function(stepsLibrary) {
  'use strict';

  var wall;
  stepsLibrary
    .given("a $NUM foot wall", function(height, next) {
      wall = new Wall();
      next();
    })
    .given("$NUM green bottles are standing on the wall", function(number_of_bottles, next) {
      wall.bottles = number_of_bottles;
      next();
    })
    .when("$NUM green bottle accidentally falls", function(number_of_falling_bottles, next) {
      wall.fall(number_of_falling_bottles);
      next();
    })
    .then("there (?:are|are still) $NUM green bottles standing on the wall", function(number_of_bottles, next) {
      expect(number_of_bottles).to.equal(wall.bottles.toString());
      next();
    });

  var Wall = function(bottles) {
    this.bottles = bottles;
    this.fall = function(n) {
      this.bottles -= n;
    };
    this.returned = function() {
      this.bottles++;
    };
  };

})(window.stepsLibrary);
