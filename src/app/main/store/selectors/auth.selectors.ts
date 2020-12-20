import {createFeatureSelector, createSelector} from '@ngrx/store';
import { authReducer, AuthState } from '../reducers';


export const selectAuthState =
    createFeatureSelector<AuthState>("auth");


export const isLoggedIn = createSelector(
    selectAuthState,
    auth =>  !!auth.UserData
);


export const isLoggedOut = createSelector(
    isLoggedIn,
    loggedIn => !loggedIn
);

export const pullUserData = createSelector(
  selectAuthState,
  auth => auth.UserData
);


export const checkDesignerStatus = createSelector(
    selectAuthState,
    auth => auth.UserData.designer
  );
  