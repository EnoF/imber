module Models {
  export class Errors {
    public UNAUTHORIZED = {
      code: 403,
      message: 'unauthorized'
    };
    public INTERNAL_SERVER_ERROR = {
      code: 500,
      message: 'internal server error'
    };
    public RESOURCE_NOT_FOUND = {
      code: 404,
      message: 'resource not found'
    };
  }

  export function ERRORS() {
    return new Errors();
  }
}
