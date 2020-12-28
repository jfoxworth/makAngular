import { Component, Input, OnInit, OnDestroy, SimpleChanges } from '@angular/core';

// RXJS Stuff
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';


// Models
import { UserData } from 'src/app/main/models/userData';

// Services
import { NavbarService } from '../../services/navbar.service';
import { UserService } from '../../services/user.service';


// NgRX
import {select, Store} from '@ngrx/store';
import { AuthState } from '../../store/reducers';
import { isLoggedIn } from '../../store/selectors/auth.selectors';

// animations
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NONE_TYPE } from '@angular/compiler';



@Component({
  selector: 'mak-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations:[

    trigger('comm-design-bar', [
      state('comm', style({
        height:'80px',
      })),
      state('design', style({
        height:'120px',
      })),
      transition('comm <=> design', [
        animate('0.5s')
      ])
    ]),
    trigger('comm-design-links', [
      state('comm', style({
        display:'none',
      })),
      state('design', style({
        display:'flex',
      })),
      transition('comm => design', [
        animate('0.5s')
      ])
    ]),
    trigger('comm-design-drop', [
      state('comm', style({
        display:'none',
      })),
      state('design', style({
        display:'flex',
      })),
      transition('comm => design', [
        animate('0.5s')
      ])
    ])

  ]
  })
export class NavbarComponent implements OnInit, OnDestroy {


  isLoggedIn$ 	: Observable<boolean>;
  tempUser      : UserData;
  profileImage$ : any;
  userData      : UserData;
  private _unsubscribeAll: Subject<any>;
  routeType     : string;
  displayAppNav : boolean = false;

  @Input('route') route:string;


  constructor( private NavbarService : NavbarService,
               private UserService : UserService,
               private store 			 : Store<AuthState>
) {
    this._unsubscribeAll = new Subject();
}


  ngOnInit() {

    // Get the nabar type
    this.routeType = this.NavbarService.setNavbarType(this.route);
    this.displayAppNav = this.routeType == 'design' ? true : false;

    this.UserService.userObject
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((user)=>{ this.userData = <UserData>user;
                         this.profileImage$ = this.UserService.getProfileImage( <UserData>user ); });


    this.tempUser = JSON.parse(localStorage.getItem('UserData'));
    this.isLoggedIn$ = this.store.select(isLoggedIn);
    this.isLoggedIn$.subscribe(loggedIn=>{
      (!loggedIn && this.tempUser) ? this.UserService.setUserData(this.tempUser) : '';
      this.profileImage$ = loggedIn ? this.UserService.getProfileImage( this.tempUser ) :
                                      this.UserService.getProfileImage( <UserData>{} );
      this.UserService.getUserData();
    })
  }


  ngOnChanges(changes:SimpleChanges) {
    this.route=changes.route.currentValue;
    this.routeType = this.NavbarService.setNavbarType(this.route);
  }


  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }




  navbarAnimationDone( event : AnimationEvent)
  {
    console.log('In the animation done');
    console.log(event);
    console.log((<AnimationEvent>event)['toState'] == 'design');
    this.displayAppNav = (<AnimationEvent>event)['toState'] == 'design' ? true : false;
  }



  navbarAnimationStart( event : AnimationEvent)
  {
    console.log('In the animation start');
    console.log(event);
    console.log((<AnimationEvent>event)['toState'] == 'comm');
    this.displayAppNav = (<AnimationEvent>event)['toState'] == 'comm' ? false : true;
  }


}

