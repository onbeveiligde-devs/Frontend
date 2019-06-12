import { Chat } from "./chat";
import { User } from "./user";

export class Stream {



  constructor(public id: string, public user: User, public viewerCount: number, public chats: Chat[]) {

  }

}