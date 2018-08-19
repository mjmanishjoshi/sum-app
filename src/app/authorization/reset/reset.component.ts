import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'auth-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.sass']
})
export class ResetComponent implements OnInit {
  private fEmail: FormControl = new FormControl("", [Validators.required, Validators.email]);

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  private reset() {
    if (!this.fEmail.invalid) {
      this.afAuth.auth.sendPasswordResetEmail(this.fEmail.value);
    }
  }

  private getEmailErrorMessage() {
    return this.fEmail.hasError('required') ? 'You must enter a value' :
      this.fEmail.hasError('email') ? 'Not a valid email' :
        '';
  }

}
