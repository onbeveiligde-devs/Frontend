import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatCardModule, MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _snackbar : MatSnackBar) { }

  loading = false;
  loginForm: FormGroup;


  onSubmit() {
    const publickey = this.loginForm.value['publickey'];
    const privatekey = this.loginForm.value['privatekey'];
    console.log(publickey);
    console.log(privatekey);

    this.loading = true;
    this._snackbar.open("Authservice not implemented yet", "close", {
      duration: 2000
    })
    // this.authService.login(publickey,privatekey).subscribe(
          
          //this.loading = false;
    // )
  }

  ngOnInit() {
    //this.authService.logout();
    this.loginForm = new FormGroup({
      'publickey': new FormControl(null,
        [Validators.required]),
      'privatekey': new FormControl(null,
        [Validators.required]),
    })
  }

}
