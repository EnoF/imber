var mongodb = require('mongodb');

exports.up = function(db, next) {
  var games = mongodb.Collection(db, 'games');
  games.update({
    board: undefined
  }, {
    $set: {
      board: 0
    }
  }, {
    multi: true
  }, next);
};

exports.down = function(db, next) {
  // Inreversable without risking unassignation of other games who assigned the games them self.
  next();
};
