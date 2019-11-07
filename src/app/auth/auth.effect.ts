import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { AuthActions } from './actions-type';

@Injectable()
export class AuthEffects {

  constructor(
    // Use to notify whenever action get triggered
    private actions$: Actions
  ) {

    const login$ = this.actions$
      .pipe(
        ofType(AuthActions.login), // filter(AuthActions.login.type)
        tap(
          (action) => {
            // The side effect
            localStorage.setItem(
              'user',
              JSON.stringify(action.user)
            );
          }
        )
      );

    login$.subscribe();

  }

}
