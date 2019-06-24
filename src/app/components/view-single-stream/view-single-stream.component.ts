import {ChatService} from './../../services/chat.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from 'src/app/services/user.service';
import {interval, Subscription} from 'rxjs';
import {Chat} from 'src/app/models/Chat';
import {User} from '../../models/User';
import {CryptoService} from '../../services/crypto.service';

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

  constructor(private router: Router, private userService: UserService, private chatService: ChatService, private cryptoService: CryptoService, private route: ActivatedRoute) {
  }

  async ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'));
    this.user = await this.userService.getUserById(this.route.snapshot.paramMap.get('id'));
    console.log('User = ' + this.user.name);
    //const timer = interval(1000);
    //this.subscription = timer.subscribe(x => this.chatService.getMessages(this.user.id).then(chats => this.chats = chats));
    this.chatService.dataObservable.subscribe(async message => {
      if(message.event === 'MSGTOCLIENT') {

        let verified = await this.cryptoService.verify(message.data.user + '-' + message.data.message + '-' + message.data.timestamp, message.data.sign, message.data.authorPublicKey);
        console.log('verified = ' + verified);


      }
    });
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
