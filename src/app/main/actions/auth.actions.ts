import { createAction, props } from '@ngrx/store';
import { UserData } from 'app/main/models/userData';


export const login = createAction(
    "[Login Page] User Login",
    props<{UserData: UserData}>()
);



export const logout = createAction(
  "[Top Menu] Logout"
);


export const writeUser = createAction(
  "[Toolbar] Write Data",
    props<{UserData: UserData}>()
);
