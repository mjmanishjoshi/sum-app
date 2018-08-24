import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { ConsoleService } from '../console.service';

interface ConsoleLink {
  label: string;
  icon: string;
  target: string;
}

@Component({
  selector: 'admin-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.sass']
})

export class ConsoleComponent implements OnInit {
  private links: ConsoleLink[] = [{ label: "Accounts", icon: "", target: "/admin/" }];
  private path: ConsoleLink[] = [{ label: "Accounts", icon: "home", target: "/admin/" }];

  constructor(private afAuth: AngularFireAuth, private srv: ConsoleService,
    private router: Router, private zone: NgZone) { }

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged(u => {
      this.zone.run(() => {
        if (u == null) {
          this.goToLoginPage();
        }
        else {
          this.srv.setUserInfo({ uid: u.uid });
        }
      });
    })
  }

  goToLoginPage() {
    this.router.navigate(['/auth/login'], { queryParams: { callerUrl: this.router.url } });
  }

}
