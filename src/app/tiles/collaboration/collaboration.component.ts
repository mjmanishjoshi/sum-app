import { Component, OnInit } from '@angular/core';
import { TileComponent } from '../../dashboard/tile.component';
import { DashboardService } from '../../dashboard/dashboard.service';
import { Observable } from 'rxjs';
import { CollaborationInfo, ModelService } from '../../model.service';

@Component({
  selector: 'dashboard-tile-collaboration',
  templateUrl: './collaboration.component.html',
  styleUrls: ['./collaboration.component.sass']
})
export class CollaborationComponent implements OnInit, TileComponent {
  data: any;
  private collaborations: Observable<CollaborationInfo[]>;

  constructor(private srv: DashboardService, private model: ModelService) { }

  ngOnInit() {
    this.srv.account.subscribe(a => {
      this.accid = a;
      this.initialize();
    })
  }

  private accid: string;
  initialize() {
    this.collaborations = this.model.getCollaborationsForAccount(this.accid);
  }

}
