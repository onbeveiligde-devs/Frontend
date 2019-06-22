import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatCardModule, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _snackbar : MatSnackBar, private router : Router) { }

  loading = false;
  loginForm: FormGroup;


  onSubmit() {
    const publickey = this.loginForm.value['publickey'];
    const privatekey = this.loginForm.value['privatekey'];
    console.log(publickey);
    console.log(privatekey);

    this.loading = true;
    this._snackbar.open("Checking authentication", "close", {
      duration: 2000
    })
    this.router.navigate(['/discovery'])
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
