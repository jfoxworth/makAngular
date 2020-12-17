

// Standard Angular items
import { Component, OnInit,Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


// Models
import { UserData } from '../../main/models/userData';

// RXJS
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Services
import { UserService } from '../../main/services/user.service';
import { ProfileService } from '../../main/services/profile.service';

// NgRX
import {select, Store} from '@ngrx/store';
import { AuthState } from '../../main/store/reducers';
import { Observable } from 'rxjs';


// Material
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'mak-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // Initial data
  thisUserData 		: UserData;				// Info for the logged in user
	viewUserData 		: UserData;				// Info for the user whose page is being viewed
  tempData 		    : UserData;       // Holder for user data
  profileImage    : Observable<string>;
  viewType        : number=0;
  private _unsubscribeAll: Subject<any>;


  constructor( private route	: ActivatedRoute,
               private UserService : UserService,
               private ProfileService : ProfileService,
               private MatSnackBar : MatSnackBar,
               private store : Store<AuthState>)
  {
    this._unsubscribeAll = new Subject();
  }



  ngOnInit() {

    this.UserService.userObject
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((user)=>{
      this.thisUserData = <UserData>user;
      this.viewUserData = this.ProfileService.setViewUserData( this.thisUserData, this.route.snapshot.paramMap.get('id'));
      this.profileImage = this.UserService.getProfileImage( this.viewUserData );
      this.viewType     = this.ProfileService.setViewType(this.thisUserData, this.route.snapshot.paramMap.get('id'));
    });

  }




	// -----------------------------------------------------------------------------------------------------
	// @ FUNCTIONS
	// -----------------------------------------------------------------------------------------------------

	// Update
	saveProfile($event:UserData):void{
    console.log($event);
		this.UserService.updateUser($event);
		this.MatSnackBar.open('Profile Saved','', {duration: 4000});
		localStorage.setItem('userData', JSON.stringify($event));
	}

	// Update
	changeViewType():void{
    this.viewType=this.viewType==1 ? 3 : 1;
  }

}
