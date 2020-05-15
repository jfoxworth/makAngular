import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserData } from 'app/main/profile/profile.component';

// Services
import { UserService } from 'app/main/services/user-service.service';
import { AuthService } from 'app/main/services/auth.service';
import { FirebaseService } from 'app/main/services/firebase.service';



@Component({
  selector: 'edit-bio-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditBioDialog implements OnInit {

	yearList : any;
  monthList : any;

  constructor(
	public dialogRef: MatDialogRef<EditBioDialog>,
	@Inject(MAT_DIALOG_DATA) public data: UserData,
	private UserService : UserService,
    private AuthService : AuthService,
    private FirebaseService : FirebaseService) 
  {

  	this.yearList = this.UserService.getYearList();
    this.monthList = this.UserService.getMonthList();


  }



	onNoClick(): void {
		this.dialogRef.close({data:this.data});
	}





	ngOnInit(): void {
	}

}

