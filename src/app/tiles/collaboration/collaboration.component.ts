import { Component, OnInit } from '@angular/core';
import { TileComponent } from '../../dashboard/tile.component';

@Component({
  selector: 'dashboard-tile-collaboration',
  templateUrl: './collaboration.component.html',
  styleUrls: ['./collaboration.component.sass']
})
export class CollaborationComponent implements OnInit, TileComponent {
  data: any;

  constructor() { }

  ngOnInit() {
  }

}
