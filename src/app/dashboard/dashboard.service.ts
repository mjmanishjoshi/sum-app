import { Injectable } from '@angular/core';
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

  constructor() { }

  setLayoutInfo(layout: DashboardLayoutInfo) {
    this.layout.next(layout);
  }
}
