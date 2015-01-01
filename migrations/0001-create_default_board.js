var mongodb = require('mongodb');

exports.up = function(db, next) {
  var boards = mongodb.Collection(db, 'boards');
  boards.insert({
    _id: 0,
    x: 10,
    y: 10
  }, next);
};

exports.down = function(db, next) {
  var boards = mongodb.Collection(db, 'boards');
  boards.findAndModify({
    _id: 0
  }, null, null, {
    remove: true
  }, next);
};
