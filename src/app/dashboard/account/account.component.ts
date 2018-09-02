import { Component, OnInit, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { DashboardService } from '../dashboard.service';

interface LayoutInfo extends LayoutInfoData {
  layoutid: string;
}
interface LayoutInfoData {
  default: boolean;
  title: string;
}

interface AccountInfo extends AccountInfoData {
  accid: string;
}
interface AccountInfoData {
  name: string;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit {
  private uid: string = "";
  private accid: string;
  private layouts: Observable<LayoutInfo[]>;
  private accounts: Observable<AccountInfo[]>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private zone: NgZone, private router: Router,
    private route: ActivatedRoute, private srv: DashboardService) { }

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
        this.srv.setLayoutInfo({
          accid: this.route.snapshot.params.accid,
          layoutid: this.route.snapshot.params.layoutid
        });
        this.loadLayouts(this.route.snapshot.params.accid);
      }
    });
  }

  goToLoginPage() {
    this.router.navigate(['/auth/login'], { queryParams: { callerUrl: this.router.url } });
  }

  loadUser(u: any) {
    this.uid = u;
    this.srv.setLayoutInfo({
      accid: this.route.snapshot.params.accid,
      layoutid: this.route.snapshot.params.layoutid
    });
    this.loadLayouts(this.route.snapshot.params.accid);
    this.getAccountsForUser();
  }

  loadLayouts(a) {
    this.accid = a;
    this.layouts = this.afs.collection<LayoutInfo>('accounts/' + this.accid + '/layouts').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as LayoutInfoData;
        const id = a.payload.doc.id;
        return { layoutid: id, ...data };
      }))
    );
  }

  getAccountsForUser() {
    this.accounts = this.afs.collection<AccountInfo>('accounts', ref => ref.where('owner_uid', '==', this.uid)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as AccountInfoData;
        const id = a.payload.doc.id;
        return { accid: id, ...data };
      }))
    );
  }

  onLayoutSelection(id: string) {
    this.router.navigate(['/dashboard/' + this.accid + '/layout/' + id]);
  }

  onSwitchAccount(a: string) {
    this.router.navigate(['/dashboard/' + a]);
  }

  onLogoff() {
    this.afAuth.auth.signOut();
  }
}
