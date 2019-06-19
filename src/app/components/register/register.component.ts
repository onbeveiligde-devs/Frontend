import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _snackBar : MatSnackBar) { }

  loading = false;
  registerForm: FormGroup;


  onSubmit() {
    this.loading = true;
    const name = this.registerForm.value['name'];
    const publickey = this.registerForm.value['publickey'];
    const privatekey = this.registerForm.value['privatekey'];
    console.log("name : " + name);
    
    console.log("pub key" + publickey);
    console.log("priv key" + privatekey);


    //Example error handeling
    this.loading= false;
    this._snackBar.open("Authservice not implemented yet", "close", {
      duration: 2000
    })
    

    //Example calling authservice

    // this.authService.login(publickey,privatekey).subscribe(
        //this.loading = false;
    // )
  }

  ngOnInit() {
    //this.authService.logout();
    this.registerForm = new FormGroup({
      'name': new FormControl(null,
        [Validators.required]),
      
    })
  }

}
