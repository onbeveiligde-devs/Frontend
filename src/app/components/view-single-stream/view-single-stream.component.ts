import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { interval, Subscription } from 'rxjs';
import { Chat } from 'src/app/models/Chat';

@Component({
  selector: 'app-view-single-stream',
  templateUrl: './view-single-stream.component.html',
  styleUrls: ['./view-single-stream.component.css']
})
export class ViewSingleStreamComponent implements OnInit {
  

  subscription : Subscription
  chats : Chat[]
  message : String = ""

  constructor(private router:Router, private userService : UserService, private chatService : ChatService) {

  }



  ngOnInit() {
    // let uuid = this.userService.getUuid().then(res => console.log(res));;
    const timer = interval(1000)
    this.subscription = timer.subscribe( x => this.chatService.getMessages('5d0b35df96d70b4a80cad5e9').then(chats => this.chats = chats))
    
    this.chatService.sendMessage(' yes')


  }


  viewMultiple(){
    this.router.navigate(['/follow'])
  }
  recordStream(){
    this.router.navigate(['/record'])
  }
  sendMessage(message : String) {
    console.log(message)

    this.chatService.sendMessage(message)
      
  }

}
