import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from 'app/main/creator-studio/creator-studio.component';



@Component({
  selector: 'parameter-dialog',
  templateUrl: './parameter-dialog.component.html',
  styleUrls: ['./parameter-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class editParameterDialog implements OnInit {

  constructor(
	public dialogRef: MatDialogRef<editParameterDialog>,
	@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

	onNoClick(): void {
		this.dialogRef.close({data:this.data});
	}

	ngOnInit(): void {
	}

}

