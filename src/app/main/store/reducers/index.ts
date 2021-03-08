

import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, createReducer, MetaReducer, on } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { environment } from '../../../../environments/environment';
import { DesignActions } from '../actions/designAction-types';
import { AuthActions } from '../actions/authAction-types';
import { UserData } from '../../models/userData';
import { imageObj } from '../../models/imageObj';
import { Actions } from '@ngrx/effects';




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
	designs : any;
	announcements:any;
}


export const initialDesignState:DesignState = {
	designs : <imageObj[]>[],
	announcements : <imageObj[]>[],
};


export const designImagesReducer = createReducer(

	initialDesignState,

	on(DesignActions.designImagesSave, (state, action) => {
		return {
			designs: action.designs,
			announcements:state.announcements
		}
	}),

	on(DesignActions.announcementImagesSave, (state, action) => {
		return {
			designs: state.designs,
			announcements:action.announcements
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
