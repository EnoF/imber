module Models {
  export class User extends Serializable {
    userName: string;

    constructor(user: IUser) {
      super(user);
    }
  }

  export interface IUser {
    userName: string;
  }
}
