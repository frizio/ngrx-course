import { AuthState } from './reducers/index';
import { createSelector, createFeatureSelector } from '@ngrx/store';

// Feature selector is a type safe version of the mapping function
export const selecAuthState = createFeatureSelector<AuthState>('auth');

// Selector is a MEMOIZED mapping function
export const isLoggedIn = createSelector(
  selecAuthState,
  (auth) => !!auth.user // (auth) is the result of previous state.auth
);


export const isLoggedOut = createSelector(
  isLoggedIn, // Mapping Function
  loggedIn => !loggedIn // Projector function
);
