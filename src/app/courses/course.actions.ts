import { Course } from './model/course';
import { createAction, props } from '@ngrx/store';

// Fetch all courses from the backend: this is more a COMMAND than an event
export const loadAllCourses = createAction(
  '[Courses Resolver] Load All Courses'
);

// All course fetch finished: this is more an EVENT than a command
export const allCourseLoaded = createAction(
  '[Load Courses Fetched] All Course Loaded',
  props<{courses: Course[]}>()
);


