module DAO {
  import IInjectorService = ng.auto.IInjectorService;
  import IHttpService = ng.IHttpService;
  import IQService = ng.IQService;
  import Session = Models.Session;
  import ERRORS = Models.ERRORS;
  import IRequestConfig = ng.IRequestConfig;

  export class DAO {
    $http: IHttpService;
    GET = 'get';
    POST = 'post';
    PUT = 'put';
    DELETE = 'delete';
    session: Session;
    $q: IQService;

    constructor(private $injector: IInjectorService) {
      this.$http = $injector.get('$http');
      this.session = $injector.get('session');
      this.$q = $injector.get('$q');
    }

    private setAuthToken = (response) => {
      if (!!response.data.authToken && !!response.data.user) {
        this.session.setAuthToken(response.data.authToken);
        this.session.setUser(response.data.user);
      } else if (response.data.code === ERRORS.UNAUTHORIZED.code) {
        this.session.expireAuth();
      }
    };

    execute(method, url, data?, isImage?) {
      var config: IRequestConfig = {
        method: method,
        url: this.session.getBaseUrl() + url,
        data: data,
        headers: {}
      };
      if (isImage) {
        config.responseType = 'blob';
      }
      if (this.session.isLoggedIn()) {
        config.headers.Authorization = this.session.getAuthToken();
      }
      var deferred = this.$http(config);
      deferred.then(this.setAuthToken, this.setAuthToken);
      return deferred;
    }

    get(url: string, params: Object) {
      return this.execute(this.GET, url, params);
    }

    post(url: string, data: Object) {
      return this.execute(this.POST, url, data);
    }

    put(url: string, data: Object) {
      return this.execute(this.PUT, url, data);
    }

    del(url: string) {
      return this.execute(this.DELETE, url);
    }
  }
}
