import { Course } from './../model/course';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CourseActions } from '../action-types';

export interface CoursesState extends EntityState<Course> {

}

export const adapter = createEntityAdapter<Course>();

export const initialCoursesState = adapter.getInitialState();

export const coursesReducer = createReducer(
   initialCoursesState,
   on(
     CourseActions.allCourseLoaded,                           // Action reference
     (state, action) => adapter.addAll(action.courses, state)
   )
);

export const {
  selectAll
} = adapter.getSelectors();
