import { User } from "./User";

export class Chat {



  constructor(public id: string, public streamer: User, public author: User, public message: string, public timestamp: Date, public hash : string) {

  }

}
