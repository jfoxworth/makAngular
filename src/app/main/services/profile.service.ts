
// Common Angular Items
import { Injectable } from '@angular/core';


// Models
import { UserData } from '../../main/models/userData';


// Services
import { UserService } from './user.service';



@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  thisUser    : UserData;
  viewUser    : UserData;


	constructor( private UserService : UserService ) {
  }


	// -----------------------------------------------------------------------------------------------------
	//
	// @ FUNCTIONS FOR THE PROFILE PAGE
	//
	// -----------------------------------------------------------------------------------------------------



  // Set the data for the user being viewed - either the current user or one defined in the URL
  /**
  *
  *   Inputs - The object for the current user, the id from the URL
  *   Return - User from ID or current user if nonw
  *
  * */
  setViewUserData( thisUserData:UserData, paramId:string ):UserData
  {
    if ( paramId )
    {
      this.UserService.fetchUserPromise( paramId ).then((doc)=>{ return doc});
    }else
    {
      return thisUserData
    }
  }



  // Set the type of view - either looking at your own profile or someone elses
  /**
  *
  *   Inputs - The object for the current user, the id from the URL
  *   Return - The view type - 0 for no user, 1 for current user viewing own, 2 for viewing other
  *
  * */
 setViewType( thisUserData:UserData, paramId:string ):number
 {
    if ( ( !paramId ) && ( !thisUserData.uid ) )
    {
      return 0

    }else if ((thisUserData.uid==paramId) || ( !paramId ))
    {
      return 1

    }else if (paramId)
    {
      return 2

    }else
    {
      return 3
    }
 }



}
