import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutInfo, ModelService } from '../../model.service';
import { DashboardService } from '../dashboard.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dashboard-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent implements OnInit {

  constructor(private srv: DashboardService, private model: ModelService, private router: Router,
    private route: ActivatedRoute) { }

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
  }

  loadLayouts(accid) {
    this.srv.setLayout(this.route.snapshot.params.layoutid);
    this.srv.layouts = this.model.getLayoutsForAccount(accid);
  }
}
