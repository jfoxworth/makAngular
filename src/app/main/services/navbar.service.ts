
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
	// @ FUNCTIONS FOR THE NAVBAE
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
    console.log(url);
    if ( url===undefined ){ return 'comm'; }
    let navUrl =  [ '', 'ourWork', 'products', 'services', 'aboutUs', 'contact', 'profile', 'messages', 'knowledge-base', 'projects', 'designStudio', 'marketplace', 'creatorStudio', 'invoice', 'walls', 'seating', 'desks', 'islands' ];
    let navType = ['comm', 'comm', 'comm', 'comm', 'comm', 'comm', 'design', 'design', 'design', 'design', 'design', 'design', 'design', 'design', 'comm', 'comm', 'comm', 'comm' ];
    return navType[navUrl.indexOf(url)]

  }


  setBannerOnOff ( url:string ):boolean
  {
    url = url.split('/')[1];
    if ( url===undefined ){ return false; }
    let navUrl =  [ '', 'ourWork', 'products', 'services', 'aboutUs', 'contact', 'projects', 'knowledge-base', 'messages', 'profile', 'marketplace', 'designStudio', 'creatorStudio', 'invoice' ];
    let navType = [ false, false, false, false, false, false, true, true, true, false, true, true, true, true ];
    return navType[navUrl.indexOf(url)]
  }



  setBannerText ( url:string ):string
  {
    url = url.split('/')[1];
    if ( url===undefined ){ return '' }
    let navUrl =  [ '', 'ourWork', 'products', 'services', 'aboutUs', 'contact', 'projects', 'knowledge-base', 'messages', 'profile', 'marketplace', 'designStudio', 'creatorStudio', 'invoice' ];
    let navType = [ '', '', '', '', '', '', 'My Projects', 'Knowledge Base', 'Messages', '', 'The Marketplace', 'Design Studio', 'Creator Studio', 'Invoice' ];
    return navType[navUrl.indexOf(url)]
  }

}
