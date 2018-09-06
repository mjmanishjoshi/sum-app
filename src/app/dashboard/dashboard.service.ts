import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LayoutInfo } from '../model.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  account: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  layout: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  layouts: Observable<LayoutInfo[]>;
  currentLayoutTitle: string;
  isLayoutLoaded: boolean = false;
  isEditing: boolean = false;
  onEdit: EventEmitter<void> = new EventEmitter();
  onUnEdit: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  setAccount(accid: string) {
    this.account.next(accid);
  }

  setLayout(layoutid: string) {
    this.layout.next(layoutid);
  }


}
