import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule,
  MatIconModule
} from '@angular/material';

import { CollaborationComponent } from './collaboration/collaboration.component';
import { TileComponent } from '../dashboard/tile.component';
import { TileModule } from '../dashboard/tile.module';
import { UiComponentsModule } from '../ui-components/ui-components.module';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    UiComponentsModule
  ],
  entryComponents: [
    CollaborationComponent
  ],
  declarations: [CollaborationComponent]
})
export class TilesModule implements TileModule {
  private mTileComponents: Map<string, Type<TileComponent>>;

  constructor() {
    this.mTileComponents = new Map();
    this.mTileComponents.set('Collaboration', CollaborationComponent);
  }

  getTileNames(): string[] {
    return Array.from(this.mTileComponents.keys());
  }

  getTileComponent(name: string): Type<TileComponent> {
    return this.mTileComponents.get(name);
  }
}
