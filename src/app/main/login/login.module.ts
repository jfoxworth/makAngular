

// Standard Angular Items
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


// Angular Material Items
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';


// NGRX Items
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from 'app/main/effects/auth.effects';
import { authReducer } from 'app/main/reducers';



// Fuse Specific Items
import { FuseSharedModule } from '@fuse/shared.module';



// The Component
import { LoginComponent } from 'app/main/login/login.component';



const routes = [
    {
        path     : 'login',
        component: LoginComponent
    }
];

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,


        StoreModule.forFeature('auth', authReducer),
        EffectsModule.forFeature([AuthEffects])
    ]
})
export class LoginModule
{
}
