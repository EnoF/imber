module DAO {
  import IInjectorService = ng.auto.IInjectorService;
  import User = Models.User;
  import IUser = Models.IUser;

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
      this.post('/api/users', {
        email: email,
        userName: userName,
        password: password
      });
    }

    search(query: string) {
      var deferred = this.$q.defer();
      this.get('/api/users', {
        search: query
      }).then((response: any) => {
        var users: Array<User> = [];
        response.data.forEach((user: IUser) => {
          users.push(new User(user));
        });
        deferred.resolve(users);
      }, () => {
        deferred.resolve([]);
      });
      return deferred.promise;
    }
  }

  export function userDAO($injector: IInjectorService) {
    return new UserDAO($injector);
  }
  userDAO.$inject = ['$injector'];
}
