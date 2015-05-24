module Models {
  export class Session {
    private authToken: string;
    private baseUrl: string = '';
    private user: User;

    getAuthToken() {
      return this.authToken;
    }

    setAuthToken(authToken: string) {
      this.authToken = authToken;
    }

    getUser() {
      return this.user;
    }

    setUser(user: IUser) {
      this.user = new User(user);
    }

    getBaseUrl() {
      return this.baseUrl;
    }

    setBaseUrl(url: string) {
      this.baseUrl = url;
    }

    isLoggedIn() {
      return !!this.authToken;
    }

    expireAuth() {
      this.authToken = null;
    }
  }

  export function session() {
    return new Session();
  }
}
