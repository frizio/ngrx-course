import { createSelector } from '@ngrx/store';

// Selector is a MEMOIZED mapping function
export const isLoggedIn = createSelector(
  state => state.auth,
  (auth) => !!auth.user // (auth) is the result of previous state.auth
);


export const isLoggedOut = createSelector(
  isLoggedIn,
  loggedIn => !loggedIn
);
