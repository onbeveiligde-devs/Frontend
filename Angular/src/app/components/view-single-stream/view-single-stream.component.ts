import {ChatService} from './../../services/chat.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from 'src/app/services/user.service';
import {interval, Subscription} from 'rxjs';
import {Chat} from 'src/app/models/Chat';
import {User} from '../../models/User';
import {CryptoService} from '../../services/crypto.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-single-stream',
  templateUrl: './view-single-stream.component.html',
  styleUrls: ['./view-single-stream.component.css']
})
export class ViewSingleStreamComponent implements OnInit {

  user: User;
  subscription: Subscription;
  chats: Chat[];
  message: string = '';
  src: string = '';

  constructor(private router: Router, private userService: UserService, private chatService: ChatService, private cryptoService: CryptoService, private route: ActivatedRoute) {

  }

  async ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'));
    this.user = await this.userService.getUserById(this.route.snapshot.paramMap.get('id'));
    console.log('User = ' + this.user.name);
    
    this.src = environment.apiUrl + '/stream/' + this.user.id + '?uuid=' + this.user.uuid;

    this.chats = await this.chatService.getMessages(this.user);
    this.scrollToLastChat();
    this.chatService.dataObservable.subscribe(async message => {
      if(message.event === 'MSGTOCLIENT') {
        console.log(message);
        let verified = await this.cryptoService.verify(message.data.user + '-' + message.data.message + '-' + message.data.timestamp, message.data.sign, message.data.authorPublicKey);
        console.log('verified = ' + verified);
        if(verified) {
          let author = this.userService.getCachedUsers().find(x => x.id === message.data.author);
          let chat = new Chat(message.data.id, this.user, author, message.data.message, message.data.timestamp, message.data.sign);
          this.chats.push(chat);
          this.scrollToLastChat();
        } else {
          console.log('Chat message could not be verified, not showing...');
        }
      }
    });
  }

  public scrollToLastChat() {
    setTimeout(() => {
      let element = document.getElementById("messages");
      element.scrollTop = element.scrollHeight;
    }, 100);
  }

  viewMultiple() {
    this.router.navigate(['/follow']);
  }

  recordStream() {
    this.router.navigate(['/record']);
  }

  sendMessage(message: string) {
    console.log(message);
    this.chatService.sendMessage(this.user.id, message);
  }

}
