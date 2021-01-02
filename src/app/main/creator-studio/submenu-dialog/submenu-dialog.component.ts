
/*

	This is the controller for the submenu editor.

*/


// Common Angular Items and the Dialog
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../creator-studio/creator-studio.component';
import { makDesign } from '../../models/makDesign';



@Component({
  selector: 'submenu-dialog',
  templateUrl: './submenu-dialog.component.html',
  styleUrls: ['./submenu-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubmenuDialog implements OnInit {

	copyDesign  : makDesign;

  constructor(
	public dialogRef: MatDialogRef<SubmenuDialog>,
	@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

	onNoClick(): void {
		this.dialogRef.close({data:this.data});
	}

	ngOnInit(): void {

		this.copyDesign = JSON.parse(JSON.stringify(this.data.currentDesign));	

	}

}
