import {Chat} from './../models/Chat';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {environment} from 'src/environments/environment';
import {UserService} from './user.service';
import {AuthenticationService} from './authentication.service';
import {CryptoService} from './crypto.service';
import {Observable} from 'rxjs';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket;
  public dataObservable: Observable<any>; // { event, data }

  constructor(private http: HttpClient, private userService: UserService, private authService: AuthenticationService, private cryptoService: CryptoService) {
    this.socket = io(environment.apiUrl);
    this.dataObservable = new Observable<any>(observer => {
      this.socket.on('MSGTOCLIENT', data => {
        observer.next({
          event: 'MSGTOCLIENT',
          data: data
        })
      })
    });
    this.socket.on('ERRTOCLIENT', (data) => {
      console.log('Incoming error from server below');
      console.log(data);
    });
    this.socket.on('MSGTOCLIENT', chat => {

    });
    console.log(this.socket);
  }

  public async sendMessage(userId: string, message: string) {
    let timestamp: number = Date.now();
    let sign = await this.cryptoService.sign(userId + '-' + message + '-' + timestamp, this.authService.getPrivateKey());
    console.log('Signed ' + userId + '-' + message + '-' + timestamp + ': ' + sign);

    const body = {
      user: userId,
      message: message,
      author: this.authService.getUser().id,
      subject: userId,
      timestamp: timestamp,
      sign: sign
    };

    this.socket.emit('MSGTOSERV', body);
  }

  public getMessages(user: User): Promise<Chat[]> {
    let chats = [];
    return new Promise<Chat[]>((res, rej) => {
      this.http.get<any>(environment.apiUrl + '/chat/' + user.id)
        .toPromise()
        .then(
          async result => {
            for(let i = 0; i < result.messages.length; i++) {
              let message = result.messages[i];
              let author = this.userService.getCachedUsers().find(x => x.id === message.author);
              let chat = new Chat(message._id, user, author, message.message, message.timestamp, message.sign);
              chats.push(chat);
            }
            console.log(chats);
            res(chats);
          }
        );
    });
  }


}
