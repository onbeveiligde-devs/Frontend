import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-record-stream',
  templateUrl: './record-stream.component.html',
  styleUrls: ['./record-stream.component.css']
})
export class RecordStreamComponent implements OnInit {

  public user : User
  public uuid : string
  public src : string;
  constructor() { }
  ngOnInit() {
  
    //TODO: Get uuid from selectedUser (from storage?)
    this.uuid = '5d0b35df96d70b4a80cad5e9';

    this.src = environment.apiUrl+'/golive/'+ this.uuid;
    

  }

}
