import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ConsoleUserInfo {
  uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {
  user: BehaviorSubject<ConsoleUserInfo> = new BehaviorSubject<ConsoleUserInfo>(null);

  constructor() { }

  setUserInfo(user: ConsoleUserInfo) {
    this.user.next(user);
  }
}
