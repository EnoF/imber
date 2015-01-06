var mongodb = require('mongodb');

exports.up = function(db, next) {
  var games = mongodb.Collection(db, 'games');
  var gamesBulk = games.initializeUnorderedBulkOp();
  var characters = mongodb.Collection(db, 'characters');
  var charactersBulk = characters.initializeUnorderedBulkOp();
  gamesBulk.find({}).remove();
  charactersBulk.find({}).remove();
  gamesBulk.execute(function executeNextBulk() {
    charactersBulk.execute(next);
  });
};

exports.down = function(db, next) {
  next();
};
