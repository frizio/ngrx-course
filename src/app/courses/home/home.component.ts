import { selectBeginnerCourses, selectAdvancedCourses, selectPromoTotal } from './../courses.selectors';
import { AppState } from './../../reducers/index';
import {Component, OnInit} from '@angular/core';
import {compareCourses, Course} from '../model/course';
import {Observable} from 'rxjs';
import {defaultDialogConfig} from '../shared/default-dialog-config';
import {EditCourseDialogComponent} from '../edit-course-dialog/edit-course-dialog.component';
import {MatDialog} from '@angular/material';
import {map, shareReplay} from 'rxjs/operators';
import {CoursesHttpService} from '../services/courses-http.service';
import { Store, select } from '@ngrx/store';



@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    // We nedd a selector for each of this 4 properties
    loading$: Observable<boolean>;

    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;
    promoTotal$: Observable<number>;

    constructor(
      private store: Store<AppState>,
      private dialog: MatDialog
    ) {

    }

    ngOnInit() {
      this.reload();
    }

  reload() {

    this.beginnerCourses$ = this.store.pipe(
      select(selectBeginnerCourses)
    );

    this.advancedCourses$ = this.store.pipe(
      select(selectAdvancedCourses)
    );

    this.promoTotal$ = this.store.pipe(
      select(selectPromoTotal)
    );

  }

  onAddCourse() {

    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Create Course',
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);

  }


}
