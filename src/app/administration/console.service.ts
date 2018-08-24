import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ConsoleUserInfo {
  uid: string;
}

export interface ConsoleAccountInfo {
  accid: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {
  user: BehaviorSubject<ConsoleUserInfo> = new BehaviorSubject<ConsoleUserInfo>(null);
  account: BehaviorSubject<ConsoleAccountInfo> = new BehaviorSubject<ConsoleAccountInfo>(null);

  constructor() { }

  setUserInfo(user: ConsoleUserInfo) {
    this.user.next(user);
  }

  setAccountInfo(account: ConsoleAccountInfo) {
    this.account.next(account);
  }
}
