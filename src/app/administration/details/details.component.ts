import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

interface AccountInfoData {
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

  constructor(private dialogRef: MatDialogRef<DetailsComponent>, @Inject(MAT_DIALOG_DATA) private accInfo: AccountInfoData) { }

  onSave() {
    this.accInfo.saved = true;
    this.dialogRef.close();
  }

}
