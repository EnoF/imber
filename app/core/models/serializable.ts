module Models {
  export class Serializable {
    constructor(json: Object) {
      angular.forEach(json, (value, prop) => {
        this[prop] = value;
      });
    }

    toJSON(): Object {
      var json = {};
      angular.forEach(this, (value, prop) => {
        if (value instanceof Date) {
          json[prop] = value.getTime();
        } else if (value instanceof Object) {
          return;
        } else {
          json[prop] = value;
        }
      });
      return json;
    }
  }
}
