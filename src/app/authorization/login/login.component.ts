import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormControl, Validators } from '@angular/forms';
import { auth } from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  private fEmail: FormControl = new FormControl("", [Validators.required, Validators.email]);
  private fPassword: FormControl = new FormControl("", [Validators.required]);
  private bHidePassword: boolean = true;
  private bError: boolean = false;
  private sErrorMessage: string = "";

  constructor(private afAuth: AngularFireAuth, private router: Router, private aRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  private login() {
    if (!this.fEmail.invalid && !this.fPassword.invalid) {
      this.bError = false;
      this.sErrorMessage = "";
      this.afAuth.auth.signInWithEmailAndPassword(this.fEmail.value, this.fPassword.value)
        .catch(r => this.onLoginError(r))
        .then(u => this.onLoginSuccess(u));
    }
  }

  private loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .catch(r => this.onLoginError(r))
      .then(u => this.onLoginSuccess(u));
  }

  private onLoginError(r: any) {
    this.bError = true;
    this.sErrorMessage = r.message;
  }

  private onLoginSuccess(u: any) {
    this.aRoute.queryParams.subscribe(p => {
      this.router.navigateByUrl(p.callerUrl);
    });
  }

  private getEmailErrorMessage() {
    return this.fEmail.hasError('required') ? 'You must enter a value' :
      this.fEmail.hasError('email') ? 'Not a valid email' :
        '';
  }

  private getPasswordErrorMessage() {
    return this.fPassword.hasError('required') ? 'You must enter a value' : '';
  }

}
