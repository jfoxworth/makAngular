import { Component, OnInit, Input } from '@angular/core';

// Models
import { UserData } from '../../../models/userData';

// Services
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'mak-navbar-dropdown',
  templateUrl: './navbar-dropdown.component.html',
  styleUrls: ['./navbar-dropdown.component.scss']
})
export class NavbarDropdownComponent implements OnInit {

  constructor( private AuthService : AuthService,
  ) { }

  @Input() userData:UserData;
  @Input() profileImage:any;


  ngOnInit() {

  }




  signOutUser(){
    this.AuthService.SignOut();
  }
}
