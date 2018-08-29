import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ConsoleService, ConsoleUserInfo } from '../console.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DetailsComponent } from '../details/details.component';

interface AccountInfoEditedStatus extends AccountInfo {
  added: boolean;
  saved: boolean;
}

interface AccountInfo extends AccountInfoData {
  accid: string;
}

interface AccountInfoData {
  name: string;
  description: string;
}

@Component({
  selector: 'admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  private accounts: Observable<AccountInfo[]>;
  private accInfoEdited: AccountInfoEditedStatus;

  constructor(private afs: AngularFirestore, private srv: ConsoleService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.srv.user.subscribe(u => {
      if (u != null) {
        this.getAccountsForUser(u);
      }
    })
  }

  getAccountsForUser(user: ConsoleUserInfo) {
    this.accounts = this.afs.collection<AccountInfoData>('accounts', ref => ref.where('owner_uid', '==', user.uid)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as AccountInfoData;
        const id = a.payload.doc.id;
        return { accid: id, ...data };
      }))
    );
  }

  onEdit(accid: string) {
    this.afs.doc<AccountInfoData>('accounts/' + accid).ref.get().then(value => {
      const accInfo: AccountInfoData = value.data() as AccountInfoData;
      this.accInfoEdited = { added: false, saved: false, accid: value.id, ...accInfo };
      this.openAddEditDialog();
    });
  }

  onDelete(accid: string) {
    this.afs.doc<AccountInfoData>('accounts/' + accid).ref.delete();
  }

  onAdd() {
    this.accInfoEdited = { added: true, saved: false } as AccountInfoEditedStatus;
    this.openAddEditDialog();
  }

  openAddEditDialog() {
    const dialogRef = this.dialog.open(DetailsComponent, {
      data: this.accInfoEdited
    });
    dialogRef.afterClosed().subscribe(result => {
      if (this.accInfoEdited.saved) {
        this.saveAccountInfo();
      }
    });
  }

  saveAccountInfo() {
    const accInfo: AccountInfoData = { name: this.accInfoEdited.name, description: this.accInfoEdited.description };
    if (this.accInfoEdited.added) {
      const userInfo: ConsoleUserInfo = this.srv.user.getValue();
      if (userInfo != null) {
        this.afs.collection('accounts').add({ owner_uid: userInfo.uid, ...accInfo });
      }
    }
    else {
      this.afs.doc<AccountInfoData>('accounts/' + this.accInfoEdited.accid).update(accInfo);
    }
  }

}
