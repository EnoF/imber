module Models {
  export class Serializable {
    constructor(json: Object) {
      json.forAll((prop, value) => {
        this[prop] = json[prop];
      });
    }

    toJSON(): Object {
      var json = {};
      this.forAll((prop, value) => {
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

interface Object {
  forAll(execution: (prop: string, value: any) => void): void;
}

Object.prototype.forAll = function(execution: (prop: string, value: any) => void) {
  for (var prop in this) {
    if (!this.hasOwnProperty(prop)) {
      continue;
    }
    execution(prop, this[prop]);
  }
};
