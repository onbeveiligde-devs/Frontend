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

  message : string = "Enter message"
  subscription : Subscription
  chats : Chat[] = []
  userId : string = "IDHIERSVP"
  ngOnInit() {

    const timer = interval(1000);
    
    this.subscription = timer.subscribe(x => this.chatService.testMessages().then(res => this.chats = res ));
    
    
  }


  sendMessage(message: string) {

    console.log(message)
    this.chatService.addMessage(message, this.userId).subscribe(
      (res) => {
        console.log(res)
      },
      (err) =>
      {
        console.log(err)
      }
      
    )
  }
  viewMultiple(){
    this.router.navigate(['/follow'])
  }
  recordStream(){
    this.router.navigate(['/record'])
  }

}
