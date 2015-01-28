module.exports = (function(stepsLibrary) {
  'use strict';

  var wall;
  stepsLibrary
    .given("a $NUM foot wall", function(height) {
      wall = new Wall();
    })
    .given("$NUM green bottles are standing on the wall", function(number_of_bottles) {
      wall.bottles = number_of_bottles;
    })
    .when("$NUM green bottle accidentally falls", function(number_of_falling_bottles) {
      wall.fall(number_of_falling_bottles);
    })
    .then("there (?:are|are still) $NUM green bottles standing on the wall", function(number_of_bottles) {
      expect(number_of_bottles).to.equal(wall.bottles.toString());
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
