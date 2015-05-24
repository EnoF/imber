module Models {
  export class Serializable {
    constructor(json: Object) {
      this.forEach(json, (value, prop) => {
        this[prop] = value;
      });
    }

    toJSON(): Object {
      var json = {};
      this.forEach(this, (value, prop) => {
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

    forEach(json: Object, iterator: (value: any, prop: string) => void) {
      for (var prop in json) {
        if (!json.hasOwnProperty(prop)) {
          continue;
        }
        iterator(prop, json[prop]);
      }
    }
  }
}
