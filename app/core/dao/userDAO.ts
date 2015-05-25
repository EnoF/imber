module DAO {
  import IInjectorService = ng.auto.IInjectorService;

  export class UserDAO extends DAO {
    constructor($injector: IInjectorService) {
      super($injector);
    }

    login(userName: string, password: string) {
      return this.post('/api/login', {
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

  export function userDAO($injector: IInjectorService) {
    return new UserDAO($injector);
  }
  userDAO.$inject = ['$injector'];
}
