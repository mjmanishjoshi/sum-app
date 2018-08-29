import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material';

interface LayoutInfo extends LayoutInfoData {
  layoutid: string;
}
interface LayoutInfoData {
  default: boolean;
  title: string;
}
interface LayoutUsageInfo {
  rows: LayoutRowInfo[];
}
interface LayoutRowInfo {
  cols: LayoutColInfo[];
}
interface LayoutColInfo {
  rowspan: number;
  colspan: number;
  width: string;
}

@Component({
  selector: 'dashboard-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  private uid: string;
  private accid: string;
  private layouts: Observable<LayoutInfo[]>;
  private currentLayoutid: string;
  private layoutRows: Observable<LayoutRowInfo[]>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router, private zone: NgZone, private route: ActivatedRoute) { }

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged(u => {
      this.zone.run(() => {
        if (u == null) {
          this.goToLoginPage();
        }
        else {
          this.loadUser(u.uid);
        }
      });
    })
  }

  goToLoginPage() {
    this.router.navigate(['/auth/login'], { queryParams: { callerUrl: this.router.url } });
  }

  loadUser(u: any) {
    this.uid = u;
    this.loadLayouts(this.route.snapshot.params.accid);
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

  onLayoutSelection(event: MatSelectChange) {
    this.currentLayoutid = event.value;
    this.loadLayout();
  }

  loadLayout() {
    this.layoutRows = this.afs.doc<LayoutUsageInfo>('accounts/'+this.accid+'/layouts/'+this.currentLayoutid).valueChanges().pipe(
      map(value => {
        const rows = value.rows;
        return value.rows;
      })
    )
  }

}
