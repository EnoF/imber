/// <reference path="./serializable"/>

module Models {
  export class Game extends Serializable {
    board: Board;
    challenger: User;
    opponent: User;
    started: boolean;

    constructor(json: IGame) {
      super(json);
      this.board = new Board(json.board);
      this.challenger = new User(json.challenger);
      this.opponent = new User(json.opponent);
    }
  }

  export interface IGame {
    board: IBoard;
    challenger: IUser;
    opponent: IUser;
    started: boolean;
  }
}
