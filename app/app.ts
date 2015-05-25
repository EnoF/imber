module Imber {
  angular.module('imber.dao', [])
    .factory(DAO);

  angular.module('imber.models', [])
    .factory(Models);

  angular.module('imber.templates', []);

  angular.module('imber', ['imber.login', 'imber.challenges']);
}
