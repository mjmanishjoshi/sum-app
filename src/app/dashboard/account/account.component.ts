import { Component, OnInit, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { DashboardService } from '../dashboard.service';
import { ModelService, AccountInfo } from '../../model.service';

@Component({
  selector: 'dashboard-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit {
  private uid: string = "";
  private accid: string;
  private accounts: Observable<AccountInfo[]>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private zone: NgZone, private router: Router,
    private route: ActivatedRoute, private srv: DashboardService, private model: ModelService) { }

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged(u => {
      this.zone.run(() => {
        if (u == null) {
          this.uid = "";
          this.goToLoginPage();
        }
        else {
          this.loadUser(u.uid);
        }
      });
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.srv.setAccount(this.route.snapshot.params.accid);
      }
    });
  }

  goToLoginPage() {
    this.router.navigate(['/auth/login'], { queryParams: { callerUrl: this.router.url } });
  }

  loadUser(u: any) {
    this.uid = u;
    this.srv.setAccount(this.route.snapshot.params.accid);
    this.accounts = this.model.getAccountsForUser(this.uid);
  }

  onLayoutSelection(id: string) {
    this.router.navigate(['/dashboard/' + this.srv.account.value + '/layout/' + id]);
  }

  onSwitchAccount(a: string) {
    this.router.navigate(['/dashboard/' + a]);
  }

  onLogoff() {
    this.afAuth.auth.signOut();
  }

  onEditDashboard() {
    this.srv.onEdit.emit();
  }
  onDoneDashboard(doSave: boolean) {
    this.srv.onUnEdit.emit(doSave);
  }
}
