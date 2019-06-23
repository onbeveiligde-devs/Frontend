import { Component, OnInit, ViewChild, ElementRef, ViewChildren, AfterViewInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { templateJitUrl } from '@angular/compiler';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';


@Component({
  selector: 'app-view-stream',
  templateUrl: './view-stream.component.html',
  styleUrls: ['./view-stream.component.css']
})



export class ViewStreamComponent {
  streamPos1: User[];
  streamPos2: User[];
  streamPos3: User[];
  streamPos4: User[];

  public src1: String;
  public src2: String;
  public src3: String;
  public src4: String;

  public selectedUser1: any
  public selectedUser2: any
  public selectedUser3: any
  public selectedUser4: any



  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.fetchUsers();
    this.streamPos1 = [];
    this.streamPos2 = [];
    this.streamPos3 = [];
    this.streamPos4 = [];



  }

  drop(event: CdkDragDrop<any[]>) {
    this.userService.fetchUsers();
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      if (event.container.data.length < 1) {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);

        switch (event.container.id) {
          case 'streamPos1List': {
            this.src1 = environment.apiUrl + '/stream/' + this.streamPos1[0].id + '?' + 'uuid=' + this.streamPos1[0].uuid + '#t=100000,1000000'
            break;
          } case 'streamPos2List': {
            this.src2 = environment.apiUrl + '/stream/' +  this.streamPos2[0].id + '?' + 'uuid=' +  this.streamPos2[0].uuid + '#t=100000'
            break;
          } case 'streamPos3List': {
            this.src3 = environment.apiUrl + '/stream/' +  this.streamPos2[0].id + '?' + 'uuid=' +  this.streamPos2[0].uuid + '#t=100000'
            break;
          } case 'streamPos4List': {
            this.src4 = environment.apiUrl + '/stream/' +  this.streamPos2[0].id + '?' + 'uuid=' +  this.streamPos2[0].uuid + '#t=100000'
            break;
          }
        }


      }
    }
  }
  viewSingle(id: string) {
    this.router.navigate(['/follow/' + id])
  }

}
