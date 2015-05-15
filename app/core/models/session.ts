module Models {
  export class Session {
    private authToken: string;
    private baseUrl: string = '';

    getAuthToken() {
      return this.authToken;
    }

    setAuthToken(authToken: string) {
      this.authToken = authToken;
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
