/// <reference path="./serializable"/>

module Models {
  export class Board extends Serializable {
    _id: number;
    x: number;
    y: number;

    constructor(json: Object) {
      super(json);
    }
  }

  export interface IBoard {
    _id: number;
    x: number;
    y: number;
  }
}
