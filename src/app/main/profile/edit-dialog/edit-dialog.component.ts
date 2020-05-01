import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserData } from 'app/main/profile/profile.component';



@Component({
  selector: 'edit-bio-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditBioDialog implements OnInit {

  constructor(
	public dialogRef: MatDialogRef<EditBioDialog>,
	@Inject(MAT_DIALOG_DATA) public data: UserData) {}

	onNoClick(): void {
		this.dialogRef.close({data:this.data});
	}





	ngOnInit(): void {
	}

}

