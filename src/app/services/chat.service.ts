import { Chat } from './../models/Chat';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = 'http://localhost:3000';
  private socket;
  private chats : Chat[];

  constructor(private http: HttpClient) {
    this.chats = []
    this.socket = io(this.url)
    console.log('in chat service')
    console.log(this.socket)

  }

  public sendMessage(message: String) {

    const body = {
      message: message,
      author: '5d0b35df96d70b4a80cad5e9',
      subject: '5d0b35df96d70b4a80cad5e9',
      timestamp: Date.now(),
      sign: '5d0b35df96d70b4a80cad5e9',
      privateKey :"",
      publicKey : ""
    }

    this.socket.emit('MSGTOSERV', body)
   
  }

  public getMessages(subject: String) {
    this.chats = []
    return new Promise<Chat[]>((res, rej) => {
      this.http.get<any>(environment.apiUrl + `/chat/${subject}`)
        .toPromise()
        .then(
          result => {
            for ( let i = 0; i < result.messages.length; i++) {
                let message = result.messages[i];
                this.chats.push(message);
            }
            console.log(this.chats)
            res(this.chats)
          }
        )
    })
  }



}
