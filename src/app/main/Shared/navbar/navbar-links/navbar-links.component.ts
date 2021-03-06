import { Component, OnInit, Input } from '@angular/core';
import { UserData } from 'src/app/main/models/userData';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'mak-navbar-links',
  templateUrl: './navbar-links.component.html',
  styleUrls: ['./navbar-links.component.scss', '../../../commercial/comm-styles.scss']
})
export class NavbarLinksComponent implements OnInit {

  navbarLinks : object[];

  @Input() userData:UserData;
  @Input() isLoggedIn:boolean
  @Input('route') route:string;

  constructor( private UserService : UserService) { }

  ngOnInit() {

    if (this.isLoggedIn && this.userData.designer)
    {

      this.navbarLinks = [
/*
        {
          title: 'My Profile',
          icon : 'person',
          url  : '/profile'
        },
        {
          title: 'Messages',
          icon : 'email',
          url  : '/messages'
        },

        {
          title: 'Knowledge Base',
          icon : 'help_outline',
          url  : '/knowledge-base'
        },
        {
          title: 'My Projects',
          icon : 'today',
          url  : '/projects'
        },
        */
        {
          title: 'Creator Studio',
          icon : 'settings',
          url  : '/creatorStudio'
        },
  
        {
          title: 'Design Studio',
          icon : 'color_lens',
          url  : '/designStudio'
        },
        {
          title: 'Catalog',
          icon : 'store',
          url  : '/catalog'
        },
        {
          title: 'Dashboard',
          icon : 'dashboard',
          url  : '/dashboard'
        },
      ];



    }else if (this.isLoggedIn) {

      this.navbarLinks = [
/*
        {
          title: 'My Profile',
          icon : 'person',
          url  : '/profile'
        },
        {
          title: 'Messages',
          icon : 'email',
          url  : '/messages'
        },

        {
          title: 'Knowledge Base',
          icon : 'help_outline',
          url  : '/knowledge-base'
        },
        {
          title: 'The Marketplace',
          icon : 'store',
          url  : '/marketplace'
        }

        {
          title: 'My Projects',
          icon : 'today',
          url  : '/projects'
        },
*/
        {
          title: 'Design Studio',
          icon : 'color_lens',
          url  : '/designStudio'
        },
        {
          title: 'Catalog',
          icon : 'store',
          url  : '/catalog'
        },
        {
          title: 'Dashboard',
          icon : 'dashboard',
          url  : '/dashboard'
        },
      ];



    }else {

      this.navbarLinks = [
/*
        {
          title: 'Knowledge Base',
          icon : 'help_outline',
          url  : '/knowledge-base'
        },
*/
        {
          title: 'Design Studio',
          icon : 'color_lens',
          url  : '/designStudio'
        },
        {
          title: 'Catalog',
          icon : 'store',
          url  : '/catalog'
        }
      ];

    }

  }

}
