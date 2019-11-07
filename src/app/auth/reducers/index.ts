import { User } from './../model/user.model';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on
} from '@ngrx/store';
import { AuthActions } from '../actions-type';

// This is the definition of the state inside the store
export interface AuthState {
  user: User;
}

export const initialAuthState: AuthState = {
  user: undefined
};

// function authReducer(state, action): AuthState { }

export const authReducer = createReducer(
  initialAuthState,
  on(
    AuthActions.login,
    (state, action) => {
      console.log('Calling login reducer');
      // Problematic with Push change detection
      // state.user = action.user;
      // return state;
      return { user: action.user };
    }
  ),
  on(
    AuthActions.logout,
    (state, action) => {
      console.log('Calling login reducer');
      return { user: undefined };
    }
  )
);
