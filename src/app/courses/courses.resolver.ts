import { allCourseLoaded } from './courses.selectors';
import { AppState } from './../reducers/index';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { loadAllCourses } from './course.actions';
import { first, finalize, tap, filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class CoursesResolver implements Resolve<any> {

  loading = false;

  constructor(
    private store: Store<AppState>
  ) { }

  // This runs before the router complete its transition.
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {
    return this.store
      .pipe(
        select(
          allCourseLoaded
        ),
        tap(
          (coursesLoaded) => {
            if (!this.loading && !coursesLoaded) {
              this.loading = true;
              this.store.dispatch(loadAllCourses());  //
            }
          }
        ),
        filter(
          (coursesLoaded) => coursesLoaded
        ),
        first(),
        finalize(
          () => this.loading = false
        )
      );
  }

}
