import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,  Validators} from '@angular/forms';

// Services
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

// RXJS
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Models
import { UserData } from '../../models/userData'

// NgRX
import {select, Store} from '@ngrx/store';
import { AuthState } from '../../store/reducers';
import { isLoggedIn } from '../../store/selectors/auth.selectors';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoggedIn$ 	: Observable<boolean>;
  tempUser      : UserData;
  loginForm     : FormGroup;
  isLoggedIn    : boolean;
  userData      : UserData;
	private _unsubscribeAll: Subject<any>;


  constructor( public authService  : AuthService,
               private _formBuilder: FormBuilder,
               private UserService : UserService,
               private store 			 : Store<AuthState> )
  {
		this._unsubscribeAll = new Subject();
  }




  ngOnInit() {


    this.UserService.userObject
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((user)=>{ this.userData = <UserData>user; });


    this.tempUser = JSON.parse(localStorage.getItem('UserData'));
    this.isLoggedIn$ = this.store.select(isLoggedIn);
    this.isLoggedIn$.subscribe(loggedIn=>{
      (!loggedIn && this.tempUser) ? this.UserService.setUserData(this.tempUser) : '';
      this.UserService.getUserData();
    })


    this.loginForm = this._formBuilder.group({
      email   : ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
  });


}



    // -----------------------------------------------------------------------------------------------------
    // @ Functions
    // -----------------------------------------------------------------------------------------------------


    login( )
    {
      this.authService.SignIn( this.loginForm.get('email').value, this.loginForm.get('password').value )
    }

}
