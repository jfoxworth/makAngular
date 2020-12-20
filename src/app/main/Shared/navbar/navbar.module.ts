import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';


// Components
import { NavbarComponent } from './navbar.component';
import { NavbarLinksComponent } from './navbar-links/navbar-links.component';
import { NavbarDropdownComponent } from './navbar-dropdown/navbar-dropdown.component';


// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

// NGRX Items
import { authReducer } from '../../store/reducers';
import { StoreModule } from '@ngrx/store';
import { CommLinksComponent } from './comm-links/comm-links.component';


@NgModule({
  declarations: [
    NavbarComponent,
    NavbarLinksComponent,
    NavbarDropdownComponent,
    CommLinksComponent
  ],
  imports: [
    StoreModule.forFeature('auth', authReducer),
    CommonModule,
    RouterModule,
    FlexLayoutModule,

    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,

  ],
  exports : [
    NavbarComponent,
    NavbarLinksComponent,
    NavbarDropdownComponent
  ]
})
export class NavbarModule { }
