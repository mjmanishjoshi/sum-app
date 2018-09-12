import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutInfo, ModelService, LayoutInfoData } from '../../model.service';
import { DashboardService } from '../dashboard.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'dashboard-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent implements OnInit {

  constructor(private srv: DashboardService, private model: ModelService, private router: Router,
    private route: ActivatedRoute, private afs: AngularFirestore) { }

  ngOnInit() {
    this.srv.account.subscribe(a => {
      if (a != null) {
        this.loadLayouts(a);
      }
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.srv.setLayout(this.route.snapshot.params.layoutid);
      }
    });
    this.srv.layout.subscribe(l => {
      if (l != null) {
        this.loadLayout();
      }
    });
  }

  loadLayouts(accid) {
    this.srv.setLayout(this.route.snapshot.params.layoutid);
    this.srv.layouts = this.model.getLayoutsForAccount(accid);
  }

  loadLayout() {
    this.srv.isLayoutLoaded = false;
    this.srv.currentLayoutTitle = "";
    this.afs.doc<LayoutInfoData>('accounts/' + this.srv.account.value +
      '/layouts/' + this.srv.layout.value).valueChanges()
      .subscribe(l => {
        this.srv.currentLayoutTitle = l.title;
        this.srv.isLayoutLoaded = true;
      });
  }
}
