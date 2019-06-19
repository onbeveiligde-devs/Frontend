import { HttpClient } from '@angular/common/http';
import { Chat } from './../models/Chat';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Headers, Http } from '@angular/http';

import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class ChatService {

    readonly url = 'http://localhost:3000'
    chats: Chat[] = [];
    constructor(
        private httpClient: HttpClient, private http:  Http,
    ) { }

    public createChatFromObject(obj): Chat {
        // TODO: Get online status from obj
        return new Chat(null,null,null,null,null,null);
    }

    fetchChatsForUser(userId: string) : Promise<Chat[]>{
        console.log('infunction')
        return new Promise<Chat[]>((res,rej) => {
            this.httpClient.get<any>(this.url + `/chat/${userId}`)
            .toPromise()
            .then(result => {
                console.log(result)
                if(!result.chats){
                    rej("Chats not found")
                }else {
                    res(result.chats.map(x=>this.createChatFromObject(x)))
                }
  
            })
        })
          
    }

    addMessage(message: string, userId: string): Observable<boolean> {
        let requestBody = { message: message, timestamp: Date.now, hash: null, author: null, user: null };
        return this.http.post(this.url + `/chat/${userId}`, requestBody)
            .pipe(
                map(response => {
                    //Checken of het 
                    if (response.status == 200) {
                        return true;
                    }
                    else {
                        return false;
                    }
                })
            )
    }

    testMessages() {
        return new Promise<Chat[]>((res,rej) => {

      

            let num = Math.floor(Math.random()* Math.floor(99))

            let message = "test " + num;
            let chat = new Chat("id", null,null, message,null,null );
            this.chats.push(chat);
            console.log(' test messages sent ')
            res(this.chats);
        })
    }

    
}


