import { tap } from 'rxjs/operators';
import { isLoggedIn } from './auth.selector';
import { select, Store } from '@ngrx/store';
import { AppState } from './../reducers/index';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store
              .pipe(
                select(isLoggedIn),
                tap(
                  (loggedIn) => {
                    if (!loggedIn) {
                      this.router.navigateByUrl('/login');
                    }
                  }
                )
              );
  }

}
