import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  private fEmail: FormControl = new FormControl("", [Validators.required, Validators.email]);
  private fPassword: FormControl = new FormControl("", [Validators.required]);
  private fConfirmPassword: FormControl = new FormControl("", [Validators.required]);
  private bHidePassword: boolean = true;
  private bError: boolean = false;
  private sErrorMessage: string = "";

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  private register() {
    if (!this.fEmail.invalid && !this.fPassword.invalid && !this.fConfirmPassword.invalid) {
      this.bError = false;
      this.sErrorMessage = "";
      if(this.fPassword.value != this.fConfirmPassword.value) {
        this.bError = true;
        this.sErrorMessage = 'Passwords do not match';
        return;
      }
      this.afAuth.auth.createUserWithEmailAndPassword(this.fEmail.value, this.fPassword.value)
        .catch(r => {
          this.bError = true;
          this.sErrorMessage = r.message;
        })
        .then(u => {
          this.router.navigate(['../login']);
        });
    }
  }

  private getEmailErrorMessage() {
    return this.fEmail.hasError('required') ? 'You must enter a value' :
      this.fEmail.hasError('email') ? 'Not a valid email' :
        '';
  }

  private getPasswordErrorMessage() {
    return this.fPassword.hasError('required') ? 'You must enter a value' : '';
  }

  private getConfirmPasswordErrorMessage() {
    return this.fConfirmPassword.hasError('required') ? 'You must enter a value' : '';
  }

}
