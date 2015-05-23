module DAO {
  import IInjectorService = ng.auto.IInjectorService;

  export class UserDAO extends DAO {
    constructor($injector: IInjectorService) {
      super($injector);
    }

    login(userName: string, password: string) {
      this.post('/api/login', {
        userName: userName,
        password: password
      });
    }

    register(email: string, userName: string, password: string) {
      this.post('/api/user', {
        email: email,
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
