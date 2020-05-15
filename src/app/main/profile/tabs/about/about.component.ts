import { Component, OnDestroy, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { EditBioDialog } from 'app/main/profile/edit-dialog/edit-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Services
import { UserService } from 'app/main/services/user-service.service';
import { AuthService } from 'app/main/services/auth.service';
import { FirebaseService } from 'app/main/services/firebase.service';


import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


export interface UserData {

    UserData:any;
    UserInfo:any;
    type:string;

}

@Component({
    selector     : 'profile-about',
    templateUrl  : './about.component.html',
    styleUrls    : ['./about.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfileAboutComponent implements OnInit {

    @Input() userData:any;
    @Input() userInfo:any;

    about: any;
    monthList : any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
        public dialog: MatDialog,
        private UserService : UserService,
        private AuthService : AuthService,
        private FirebaseService : FirebaseService,
        private afAuth: AngularFireAuth, // Inject Firebase auth service

    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();


        this.monthList = this.UserService.getMonthList();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------



    /**
     * Dialog to edit
     */
    openDialog(type) {
        console.log('In the open dialog with '+type);
        const dialogRef = this.dialog.open( EditBioDialog, {
            panelClass: 'edit-bio-dialog',
            data: { userData: this.userData, userInfo: this.userInfo, type:type }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          console.log(result);
          //this.userInfo = result;
          this.FirebaseService.updateDocDataUsingId( 'users', this.userData.uid, result )
        });

    }




    /**
     * When a user updates a display name
     */
    updateDisplayName(displayName): void
    {
      this.userInfo.displayName=displayName;
      this.FirebaseService.updateDocDataUsingId( 'users', this.userData.uid, this.userInfo );

      this.afAuth.currentUser
        .then((result) => { result.updateProfile({      
          displayName : displayName,
          photoURL: this.userData.photoURL
        })
      }); 

    }




    /**
     * On init
     */
    ngOnInit(): void
    {
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
    }
}
