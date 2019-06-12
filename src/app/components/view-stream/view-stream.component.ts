import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { User } from 'src/app/models/User';


@Component({
  selector: 'app-view-stream',
  templateUrl: './view-stream.component.html',
  styleUrls: ['./view-stream.component.css']
})
export class ViewStreamComponent implements OnInit {
  streamPlace1 : User[];
  streamPlace2 : User[];


  constructor() { }

  ngOnInit() {
    this.streamPlace1 = [    
    new User("id4", "user 4", true, 400, "privkey4")
  ];
    this.streamPlace2 = [];
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
  

}
