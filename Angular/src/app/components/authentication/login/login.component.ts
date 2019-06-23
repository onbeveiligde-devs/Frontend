import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _snackbar: MatSnackBar, public router: Router, private authService: AuthenticationService) {

  }

  loading = false;
  loginForm: FormGroup;

  async ngOnInit() {
    this.loginForm = new FormGroup({
      'publickey': new FormControl(null,
        [Validators.required]),
      'privatekey': new FormControl(null,
        [Validators.required]),
    });

    let loggedIn = await this.authService.checkLocalStorage();
    if(loggedIn) {
      this.router.navigateByUrl('/discovery');
    }
  }


  onSubmit() {
    const privateKey = this.loginForm.value['privatekey'];
    const publicKey = this.loginForm.value['publickey'];
    console.log('private key = ' + privateKey);
    console.log('public key = ' + publicKey);

    this.loading = true;
    this.authService.login(privateKey, publicKey)
      .then(success => {
        if(success) {
          this.router.navigateByUrl('/discovery');
        } else {
          this._snackbar.open('Invalid private/public keypair', 'close', {
            duration: 2500
          });
          this.loading = false;
        }
      })
      .catch(err => {
        console.error(err);
        this._snackbar.open('Invalid private/public keypair', 'close', {
          duration: 2500
        });
        this.loading = false;
      });
  }
}
