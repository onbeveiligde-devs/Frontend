import { User } from "./user";

export class Chat {



  constructor(public id: string, public streamer: User, public author: User, public message: string, public timestamp: Date) {

  }

}