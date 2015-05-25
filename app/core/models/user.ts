/// <reference path="./serializable"/>

module Models {
  export class User extends Serializable {
    userName: string;

    constructor(user: IUser) {
      super(user);
    }

    getUserName() {
      return this.userName;
    }

    setUserName(userName) {
      this.userName = userName;
    }
  }

  export interface IUser {
    _id: string;
    userName: string;
  }
}
