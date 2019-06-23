import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-view-single-stream',
  templateUrl: './view-single-stream.component.html',
  styleUrls: ['./view-single-stream.component.css']
})
export class ViewSingleStreamComponent implements OnInit {

  private src: String
  private selectedUser: User
  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute) {

  }



  ngOnInit() {


    this.route.params.subscribe(async (params) => {
      console.log(params);
      this.selectedUser = await this.userService.getUserById(params['id']);
      console.log(this.selectedUser);
      this.src = environment.apiUrl + '/stream/' +  this.selectedUser.id + '?' + 'uuid=' +  this.selectedUser.uuid
    })



  }


  viewMultiple() {
    this.router.navigate(['/follow'])
  }
  recordStream() {
    this.router.navigate(['/record'])
  }

}
