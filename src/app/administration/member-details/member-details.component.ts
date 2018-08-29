import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

interface MemberInfoData {
  added: boolean;
  saved: boolean;
  id: string;
  member_uid: string;
  description: string;
  role: string;
  valid_from: Date;
  valid_to: Date;
}

@Component({
  selector: 'admin-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.sass']
})
export class MemberDetailsComponent {
  private title: string;

  constructor(private dialogRef: MatDialogRef<MemberDetailsComponent>, @Inject(MAT_DIALOG_DATA) private memInfo: MemberInfoData) {
    this.title = (this.memInfo.added) ? 'Add Member' : 'Edit Member';
  }

  onSave() {
    this.memInfo.saved = true;
    this.dialogRef.close();
  }
}
