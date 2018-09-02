import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface DashboardLayoutInfo {
  accid: string;
  layoutid: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  layout: BehaviorSubject<DashboardLayoutInfo> = new BehaviorSubject<DashboardLayoutInfo>(null);
  currentLayoutTitle: string;
  isLayoutLoaded: boolean = false;
  isEditing: boolean = false;
  onEdit: EventEmitter<void> = new EventEmitter();
  onUnEdit: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  setLayoutInfo(layout: DashboardLayoutInfo) {
    this.layout.next(layout);
  }

}
