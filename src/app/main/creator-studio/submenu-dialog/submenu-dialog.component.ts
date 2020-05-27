import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from 'app/main/creator-studio/creator-studio.component';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'submenu-dialog',
  templateUrl: './submenu-dialog.component.html',
  styleUrls: ['./submenu-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubmenuDialog implements OnInit {

  constructor(
	public dialogRef: MatDialogRef<SubmenuDialog>,
	@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

	onNoClick(): void {
		this.dialogRef.close({data:this.data});
	}

	ngOnInit(): void {
	}

}
