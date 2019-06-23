import { Chat } from "./Chat";
import { User } from "./User";

export class Stream {



  constructor(public id: string, public user: User, public viewerCount: number, public chats: Chat[]) {

  }

}