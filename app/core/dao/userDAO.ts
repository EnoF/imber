module DAO {
  import IInjectorService = ng.auto.IInjectorService;

  export class UserDAO extends DAO {
    constructor($injector: IInjectorService) {
      super($injector);
    }

    login(userName: string, password: string) {
      this.get('/api/login', {
        userName: userName,
        password: password
      });
    }
  }

  var instance = null;

  export function userDAO($injector: IInjectorService) {
    return instance = new UserDAO($injector);
  }
  userDAO.$inject = ['$injector'];
}