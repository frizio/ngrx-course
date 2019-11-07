import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AuthActions } from './actions-type';

@Injectable()
export class AuthEffects {

  login$ = createEffect(
    () =>
     this.actions$
        .pipe(
          ofType(AuthActions.login),
          tap(
            action =>
              localStorage.setItem(
                'user',
                JSON.stringify(action.user)
              )
          )
        ),
    { dispatch: false }
  );

  constructor(
    // Use to notify whenever action get triggered
    private actions$: Actions
  ) {

  }

}
