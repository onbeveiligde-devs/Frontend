import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-record-stream',
  templateUrl: './record-stream.component.html',
  styleUrls: ['./record-stream.component.css']
})
export class RecordStreamComponent implements OnInit {

  public user : User
  public uuid : string
  public src : string;

  constructor(private authService: AuthenticationService) { 

  }

  ngOnInit() {
    this.user = this.authService.getUser();
    console.log(this.user);

    this.src = environment.apiUrl+'/golive/'+ this.user.id;
    
  }

}
