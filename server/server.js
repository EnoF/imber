// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function serverScope(express, bodyParser, mongoose, params) {
  'use strict';

  var app = express();
  var router = express.Router();
  var user = require('./user');
  var game = require('./game');
  var authorization = require('./authorization');

  params.extend(app);

  app.use(bodyParser.json());

  app.use(router);
  router.use('/api/*', authorization);

  mongoose.connect(process.env.IMBER_MONGO);

  var db = mongoose.connection;
  db.on('error', console.error);
  db.once('open', function initiateServer() {

    app.param('id', String);

    app.post('/api/login', user.login);
    app.post('/api/reauthenticate', user.reauthenticate);
    app.post('/api/users', user.register);

    app.get('/api/users', user.searchFor);

    app.get('/api/games/:id', game.getGame);
    app.get('/api/games', game.getLatestGames);
    app.post('/api/games', game.challenge);
    app.post('/api/games/:id/accept', game.accept);
  });
  module.exports = app;

}(require('express'), require('body-parser'), require('mongoose'), require('express-params')));
