import { Chat } from './../models/Chat';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Headers, Http } from '@angular/http';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Body } from '@angular/http/src/body';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    readonly url = 'http://localhost:3000'
    chats: Chat[];
    constructor(
        private http: Http,
    ) { }

    fetchChatsForUser(userId: string) {
        return this.http.get(this.url + `/chat/${userId}`)
            .pipe(
                map(response => response.json().map(data => {
                    //Is dit niet handiger ? 
                    // let user = new User(
                    //     data.user.id,
                    //     data.user.username,
                    //     data.user.online,
                    //     data.user.balance,
                    //     data.user.privateKey
                    // )
                    //Later van de service halen
                    let user = null;
                    let author = null;
                    //Maken van chat object 
                    let chat = new Chat(
                        data.id,
                        user,
                        author,
                        data.message,
                        data.timestamp,
                        data.hash
                    )
                    return chat;
                }))
            )
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
}


