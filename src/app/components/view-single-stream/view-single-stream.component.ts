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

  private user: User
  public src: String
  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute) {

  }



  ngOnInit() {

    this.userService.fetchUsers();
    this.route.params.subscribe((params) => {
      this.user = this.userService.searchUserById(params['id']);
      this.src = environment.apiUrl + '/stream/' +  this.user.id + '?' + 'uuid=' +  this.user.uuid

    })


  }


  viewMultiple() {
    this.router.navigate(['/follow'])
  }
  recordStream() {
    this.router.navigate(['/record'])
  }

}
