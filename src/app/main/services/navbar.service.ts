
// Common Angular Items
import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class NavbarService {


	constructor(  ) {
  }


	// -----------------------------------------------------------------------------------------------------
	//
	// @ FUNCTIONS FOR THE NAVBAR
	//
	// -----------------------------------------------------------------------------------------------------



  // Set the navbar type based on the URL given
  /**
  *
  *   Inputs - The first item in the URL ie chat or projects or Services or AboutUs
  *   Return - User from ID or current user if nonw
  *
  * */
  setNavbarType( url:string ):string
  {
    url = url.split('/')[1];
    if ( url===undefined ){ return 'comm'; }
    let navUrl =  [ '', 'ourWork', 'products', 'services', 'aboutUs', 'contact', 'profile', 'messages', 'knowledge-base', 'projects', 'designStudio', 'catalog', 'creatorStudio', 'invoice', 'walls', 'seating', 'desks', 'islands', 'arm', 'daikin', 'ramada', 'houstonsfirst', 'jacobwhite', 'dashboard' ];
    let navType = ['comm', 'comm', 'comm', 'comm', 'comm', 'comm', 'design', 'design', 'design', 'design', 'design', 'design', 'design', 'design', 'comm', 'comm', 'comm', 'comm', 'comm', 'comm', 'comm', 'comm', 'comm', 'design' ];
    return navType[navUrl.indexOf(url)]

  }


  setBannerOnOff ( url:string ):boolean
  {
    url = url.split('/')[1];
    if ( url===undefined ){ return false; }
    let navUrl =  [ '', 'ourWork', 'products', 'services', 'aboutUs', 'contact', 'projects', 'knowledge-base', 'messages', 'profile', 'catalog', 'designStudio', 'creatorStudio', 'invoice', 'dashboard' ];
    let navType = [ false, false, false, false, false, false, true, true, true, false, true, true, true, true, true ];
    return navType[navUrl.indexOf(url)]
  }



  setBannerText ( url:string ):string
  {
    url = url.split('/')[1];
    if ( url===undefined ){ return '' }
    let navUrl =  [ '', 'ourWork', 'products', 'services', 'aboutUs', 'contact', 'projects', 'knowledge-base', 'messages', 'profile', 'catalog', 'designStudio', 'creatorStudio', 'invoice', 'dashboard' ];
    let navType = [ '', '', '', '', '', '', 'My Projects', 'Knowledge Base', 'Messages', '', 'Catalog', 'Design Studio', 'Creator Studio', 'Invoice', 'Dashboard' ];
    return navType[navUrl.indexOf(url)]
  }

}
