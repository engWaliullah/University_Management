import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validation';
import auth from '../../middlewares/auth';


const router = express.Router();

router.post('/create-course', auth('admin'), validateRequest(CourseValidations.createCourseValidationSchema), CourseControllers.createCourse )
router.get('/:id', auth('admin', 'faculty', 'student'), CourseControllers.getSingleCourse);
router.get('/', auth('admin', 'faculty', 'student'), CourseControllers.getAllCourses);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.put('/:courseId/assign-faculties', auth('admin'), validateRequest(CourseValidations.facultiesWithCourseValidationSchema), CourseControllers.assignFacultiesWithCourse);
router.put('/:courseId/remove-faculties', auth('admin'), validateRequest(CourseValidations.facultiesWithCourseValidationSchema), CourseControllers.removeFacultiesFromCourse);

router.delete('/:id', auth('admin'), CourseControllers.deleteCourse);


export const CourseRoutes = router;
