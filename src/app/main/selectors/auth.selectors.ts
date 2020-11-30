import {createFeatureSelector, createSelector} from '@ngrx/store';
import { AuthState } from 'app/main/reducers';


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
