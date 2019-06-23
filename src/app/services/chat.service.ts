import { Chat } from './../models/Chat';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import {UserService} from './user.service';
import {AuthenticationService} from './authentication.service';
import {CryptoService} from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket;

  constructor(private http: HttpClient, private userService: UserService, private authService: AuthenticationService, private cryptoService: CryptoService) {
    this.chats = [];
    this.socket = io(this.url);
    console.log('in chat service');
    console.log(this.socket);
  }

  public sendMessage(userId: string, message: string) {



    const body = {
      message: message,
      author: this.authService.getUser().id,
      subject: userId,
      timestamp: Date.now(),
      sign: sign
    };

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
