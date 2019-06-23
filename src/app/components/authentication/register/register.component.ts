import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _snackBar : MatSnackBar, public router: Router, private authService: AuthenticationService) { }

  loading = false;
  registerForm: FormGroup;


  onSubmit() {
    this.loading = true;
    const name = this.registerForm.value['name'];
    console.log("name : " + name);

    this.authService.register(name)
      .then(user => {
        console.log('Registered as ' + user.name + ' (' + user.id + ')')
        this.loading = false;
        this.router.navigateByUrl('/discovery');
      })
      .catch(err => {
        console.error(err);
        this._snackBar.open("That name is taken", "close", {
          duration: 2000
        });
        this.loading = false;
      })

  }

  async ngOnInit() {
    //this.authService.logout();
    this.registerForm = new FormGroup({
      'name': new FormControl(null,
        [Validators.required]),
    });

    let loggedIn = await this.authService.checkLocalStorage();
    if(loggedIn) {
      console.log('logged in');
      this.router.navigateByUrl('/discovery');
    }
  }

}
