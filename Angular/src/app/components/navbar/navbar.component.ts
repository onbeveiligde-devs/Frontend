import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common'
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private _location : Location, public authService: AuthenticationService) { }

  ngOnInit() {
  }

  goBack(){
    this._location.back();
  }

}
