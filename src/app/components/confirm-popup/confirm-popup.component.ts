import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  date: object;
  title: string;
  message: string;
  hideSubmit: boolean;
}

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html'
})
export class ConfirmPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
