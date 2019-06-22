import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-record-stream',
  templateUrl: './record-stream.component.html',
  styleUrls: ['./record-stream.component.css']
})
export class RecordStreamComponent implements OnInit {

   public api : string =  environment.apiUrl + '/streamindex';
  constructor() { }
  ngOnInit() {
  
  }

}
