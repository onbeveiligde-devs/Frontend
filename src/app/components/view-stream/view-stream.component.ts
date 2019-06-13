import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { User } from 'src/app/models/User';


@Component({
  selector: 'app-view-stream',
  templateUrl: './view-stream.component.html',
  styleUrls: ['./view-stream.component.css']
})
export class ViewStreamComponent implements OnInit {
  streamPos1: User[];
  streamPos2: User[];
  streamPos3: User[];
  streamPos4: User[];


  constructor() { }

  ngOnInit() {
    this.streamPos1 = [];
    this.streamPos2 = [];
    this.streamPos3 = [];
    this.streamPos4 = [];

  }

  drop(event: CdkDragDrop<User[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }


    else {
      if (event.container.data.length < 1) {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
    }
    return;
  }


}
