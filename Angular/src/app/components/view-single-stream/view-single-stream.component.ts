import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-single-stream',
  templateUrl: './view-single-stream.component.html',
  styleUrls: ['./view-single-stream.component.css']
})
export class ViewSingleStreamComponent implements OnInit {
  

  constructor(private router:Router, private userService : UserService) {

   }



  ngOnInit() {
    // let uuid = this.userService.getUuid().then(res => console.log(res));;




  }


  viewMultiple(){
    this.router.navigate(['/follow'])
  }
  recordStream(){
    this.router.navigate(['/record'])
  }

}
