/// <reference path="./serializable"/>

module Models {
  export class Game extends Serializable {
    _id: string;
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
    _id: string;
    board?: IBoard;
    challenger?: IUser;
    opponent?: IUser;
    started?: boolean;
  }
}
