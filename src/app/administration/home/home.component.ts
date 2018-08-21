import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ConsoleService, ConsoleUserInfo } from '../console.service';
import { Observable } from 'rxjs';

interface AccountInfo {
  name: string;
}

@Component({
  selector: 'admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  private accounts: Observable<AccountInfo[]>

  constructor(private afs: AngularFirestore, private srv: ConsoleService) { }

  ngOnInit() {
    this.srv.user.subscribe(u => {
      this.getAccountsForUser(u);
    })
  }

  getAccountsForUser(user: ConsoleUserInfo) {
    this.accounts = this.afs.collection<AccountInfo>('accounts', ref => ref.where('owner_uid', '==', user.uid)).valueChanges()
  }

}
