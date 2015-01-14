var mongodb = require('mongodb');

var types = [{
  _id: 0,
  name: 'Soldier'
}, {
  _id: 1,
  name: 'Lancer'
}, {
  _id: 2,
  name: 'Knight'
}, {
  _id: 3,
  name: 'Archer'
}, {
  _id: 4,
  name: 'Mage'
}, {
  _id: 5,
  name: 'Hero'
}, {
  _id: 6,
  name: 'Sage'
}];

exports.up = function(db, next) {
  var characterTypes = mongodb.Collection(db, 'characterTypes');
  var bulk = characterTypes.initializeUnorderedBulkOp();
  types.forEach(function insertType(type) {
    bulk.insert(type);
  });
  bulk.execute(next);
};

exports.down = function(db, next) {
  var characterTypes = mongodb.Collection(db, 'characterTypes');
  var bulk = characterTypes.initializeUnorderedBulkOp();
  types.forEach(function removeType(type) {
    bulk.find(type).remove();
  });
  bulk.execute(next);
};
