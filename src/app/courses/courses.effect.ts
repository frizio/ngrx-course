import { allCourseLoaded } from './course.actions';
import { concatMap, map } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { CourseActions } from './action-types';
import { CoursesHttpService } from './services/courses-http.service';

@Injectable()
export class CoursesEffect {

  loadCourses$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(CourseActions.loadAllCourses),  // Action reference
        concatMap(
          action => this.courseHttpService.findAllCourses()
        ),
        map(
          courses => allCourseLoaded({courses})
        )
      )
  );

  saveCourse$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(CourseActions.courseUpdated),
        concatMap(
          action => this.courseHttpService.saveCourse(
            action.update.id,
            action.update.changes
          )
        )
      ),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private courseHttpService: CoursesHttpService
  ) { }

}
