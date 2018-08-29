import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { AngularFirestore } from 'angularfire2/firestore';
import { ConsoleService, ConsoleAccountInfo } from '../console.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { MemberDetailsComponent } from '../member-details/member-details.component';

interface MemberInfoEditedStatus extends MemberInfo {
  added: boolean;
  saved: boolean;
}

interface MemberInfo extends MemberInfoData {
  id: string;
}

interface MemberInfoData {
  member_uid: string;
  description: string;
  role: string;
  valid_from: Date;
  valid_to: Date;
}

@Component({
  selector: 'admin-account-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.sass']
})
export class MembersComponent implements OnInit {
  private displayedColumns: string[] = ['member_uid', 'role', 'description', 'valid_from', 'valid_to'];
  private dataSource: MemberDataSource;
  private memInfoEdited: MemberInfoEditedStatus;

  constructor(private afs: AngularFirestore, private srv: ConsoleService, private dialog: MatDialog) { }

  ngOnInit() {
    this.srv.account.subscribe(a => {
      if (a != null) {
        this.dataSource = new MemberDataSource(this.afs, a);
      }
    })
  }

  onEdit(id: string) {
    const accid: string = this.srv.account.getValue().accid;
    this.afs.doc<MemberInfoData>('accounts/' + accid + '/members' + id).ref.get().then(value => {
      const memInfo: MemberInfoData = value.data() as MemberInfoData;
      this.memInfoEdited = { added: false, saved: false, id: value.id, ...memInfo };
      this.openAddEditDialog();
    });
  }

  onDelete(id: string) {
    const accid: string = this.srv.account.getValue().accid;
    this.afs.doc<MemberInfoData>('accounts/' + accid + '/members' + id).ref.delete();
  }

  onAdd() {
    this.memInfoEdited = { added: true, saved: false, valid_from: new Date(), valid_to: new Date() } as MemberInfoEditedStatus;
    this.openAddEditDialog();
  }

  openAddEditDialog() {
    const dialogRef = this.dialog.open(MemberDetailsComponent, {
      data: this.memInfoEdited
    });
    dialogRef.afterClosed().subscribe(result => {
      if (this.memInfoEdited.saved) {
        this.saveMemberInfo();
      }
    });
  }

  saveMemberInfo() {
    const memInfo: MemberInfoData = {
      member_uid: this.memInfoEdited.member_uid, role: this.memInfoEdited.role,
      description: this.memInfoEdited.description, valid_from: this.memInfoEdited.valid_from, valid_to: this.memInfoEdited.valid_to
    };
    const accInfo: ConsoleAccountInfo = this.srv.account.getValue();
    if (accInfo != null) {
      if (this.memInfoEdited.added) {
        this.afs.collection('accounts/' + accInfo.accid + '/members').add(memInfo);
      }
      else {
        this.afs.doc<MemberInfoData>('accounts/' + accInfo.accid + '/members' + this.memInfoEdited.id).update(memInfo);
      }
    }
  }

}

class MemberDataSource extends DataSource<MemberInfo> {
  constructor(private afs: AngularFirestore, private acc: ConsoleAccountInfo) {
    super();
  }

  connect(): Observable<MemberInfo[]> {
    return this.afs.collection<MemberInfoData>('accounts/' + this.acc.accid + '/members').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as MemberInfoData;
        const id = a.payload.doc.id;
        return { id: id, ...data };
      }))
    );
  }

  disconnect() { }
}
