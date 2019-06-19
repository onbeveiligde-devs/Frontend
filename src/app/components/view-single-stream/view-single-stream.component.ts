import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-single-stream',
  templateUrl: './view-single-stream.component.html',
  styleUrls: ['./view-single-stream.component.css']
})
export class ViewSingleStreamComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }


  viewMultiple(){
    this.router.navigate(['/follow'])
  }
  recordStream(){
    this.router.navigate(['/record'])
  }

}
