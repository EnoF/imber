(function UserScope(mongoose) {
  'use strict';

  var Schema = mongoose.Schema;

  var userSchema = new Schema({
    userName: String,
    password: String,
    email: String
  });

  var User = mongoose.model('User', userSchema);

  module.exports = User;

}(require('mongoose')));
