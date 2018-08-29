import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

interface AccountInfoData {
  added: boolean;
  saved: boolean;
  accid: string;
  name: string;
  description: string;
}

@Component({
  selector: 'admin-account-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent {
  private title: string;

  constructor(private dialogRef: MatDialogRef<DetailsComponent>, @Inject(MAT_DIALOG_DATA) private accInfo: AccountInfoData) {
    this.title = (this.accInfo.added) ? 'Add Account' : 'Edit Account';
  }

  onSave() {
    this.accInfo.saved = true;
    this.dialogRef.close();
  }

}
