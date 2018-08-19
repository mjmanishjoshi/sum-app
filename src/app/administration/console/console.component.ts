import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.sass']
})
export class ConsoleComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, private router: Router, private zone: NgZone) { }

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged(u => {
      if (u == null) {
        this.zone.run(() => this.goToLoginPage());
      }
      else {

      }
    })
  }

  goToLoginPage() {
    this.router.navigate(['/auth/login'], {queryParams: {callerUrl: this.router.url}});
  }

}
