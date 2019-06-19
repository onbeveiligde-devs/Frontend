import { Component, OnInit, ViewChild, ElementRef, ViewChildren, AfterViewInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { templateJitUrl } from '@angular/compiler';


@Component({
  selector: 'app-view-stream',
  templateUrl: './view-stream.component.html',
  styleUrls: ['./view-stream.component.css']
})
export class ViewStreamComponent {
  streamPos1: any[];
  streamPos2: any[];
  streamPos3: any[];
  streamPos4: any[];


  


  constructor(private router: Router) { }

  ngOnInit() {
    this.streamPos1 = [];
    this.streamPos2 = [];
    this.streamPos3 = [];
    this.streamPos4 = [];
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      if (event.container.data.length < 1) {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);

          console.log(event);
      }
    }
  }
}
