import { Chat } from './../../models/Chat';
import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-view-single-stream',
  templateUrl: './view-single-stream.component.html',
  styleUrls: ['./view-single-stream.component.css']
})
export class ViewSingleStreamComponent implements OnInit {

  constructor(private router:Router, private chatService : ChatService) { }

  subscription : Subscription
  chats : Chat[] = []
  ngOnInit() {

    const timer = interval(1000);
    
    this.subscription = timer.subscribe(x => this.chatService.testMessages().then(res => this.chats = res ));
    
    
  }


  viewMultiple(){
    this.router.navigate(['/follow'])
  }
  recordStream(){
    this.router.navigate(['/record'])
  }

}
