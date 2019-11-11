import { map, tap, filter, first } from 'rxjs/operators';
import { CourseEntityService } from './courses-entity.service';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class CoursesResolver implements Resolve<boolean> {

  constructor(
    private coursesService: CourseEntityService
  ) {}

  resolve( route: ActivatedRouteSnapshot,
           state: RouterStateSnapshot ): Observable<boolean> {
    // The transiction will not complete until the returned Observable is completed
    
    return this.coursesService.loaded$
      .pipe(
        tap(
          loaded => {
            if (!loaded) {
              // Fetch the data with http request and save them in the data store
              this.coursesService.getAll();
            }
          }
        ),
        filter(loaded => !!loaded), // waiting for the data loaded in the store
        first()  // completing the observable and ensuring that the transictgion goes true
      );
  }

}
