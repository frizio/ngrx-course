import { Course, compareCourses } from './../model/course';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CourseActions } from '../action-types';

export interface CoursesState extends EntityState<Course> {
  // Extra state: true if the course are already fetched from the backend
  allCoursesLoadedFlag: boolean;
}

// Utility that make it easy manage the entity format
export const adapter = createEntityAdapter<Course>(
  // Adapter Configuration
  {
    sortComparer: compareCourses
  }
);

export const initialCoursesState = adapter.getInitialState( { allCoursesLoadedFlag: false } );

export const coursesReducer = createReducer(
   initialCoursesState,
   on(
     CourseActions.allCourseLoaded,  // Action reference
     (state, action) => adapter.addAll(action.courses, {...state, allCoursesLoadedFlag: true})
   )
);

export const {
  selectAll
} = adapter.getSelectors();
