import { Type } from "@angular/core";
import { TileComponent } from "./tile.component";

export interface TileModule {
    getTileNames(): string[];
    getTileComponent(name: string): Type<TileComponent>;
}