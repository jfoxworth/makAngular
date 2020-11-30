

import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, createReducer, MetaReducer, on } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { environment } from 'environments/environment';
import { DesignActions } from 'app/main/actions/designAction-types';
import { AuthActions } from 'app/main/actions/authAction-types';
import { User } from 'app/main/models/user';
import { UserData } from 'app/main/models/userData';
import { imageObj } from 'app/main/models/imageObj';
import { makDesign } from 'app/main/models/makDesign';
import { makProject } from 'app/main/models/makProject';
import { makVersion } from 'app/main/models/makVersion';




/*-----------------------------------------------------------------

	The generic overall app state

-----------------------------------------------------------------*/

export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {
	router: routerReducer,
};

export function logger(reducer:ActionReducer<any>)
	: ActionReducer<any> {
	return (state, action) => {
		console.log("state before: ", state);
		console.log("action", action);

		return reducer(state, action);
	}

}


export const metaReducers: MetaReducer<AppState>[] =
	!environment.production ? [logger] : [];








/*-----------------------------------------------------------------

	The design state

-----------------------------------------------------------------*/

export interface DesignState {
	designs : any
}


export const initialDesignState:DesignState = {
	designs : <imageObj[]>[],
};


export const designImagesReducer = createReducer(

	initialDesignState,

	on(DesignActions.designImagesSave, (state, action) => {
		console.log('The action is ');
		console.log(action);
		return {
			designs: action.designs
		}
	})

);








/*-----------------------------------------------------------------

	The auth state

-----------------------------------------------------------------*/
export interface AuthState {
	UserData: UserData
}

export const initialAuthState: AuthState = {
	UserData: undefined
};

export const authReducer = createReducer(

	initialAuthState,

	on(AuthActions.login, (state, action) => {
		return {
			UserData: action.UserData
		}
	}),

	on(AuthActions.logout, (state, action) => {
		return {
			UserData: undefined
		}
	}),

	on(AuthActions.writeUser, (state, action) => {
		return {
			UserData: action.UserData
		}
	}),



);