module Models {
  export class ERRORS {
    static UNAUTHORIZED = {
      code: 403,
      message: 'unauthorized'
    };
    static INTERNAL_SERVER_ERROR = {
      code: 500,
      message: 'internal server error'
    };
    static RESOURCE_NOT_FOUND = {
      code: 404,
      message: 'resource not found'
    };
  }
}
