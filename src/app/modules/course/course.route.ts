import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validation';


const router = express.Router();

router.post('/create-course', validateRequest(CourseValidations.createCourseValidationSchema), CourseControllers.createCourse )
router.get('/:id', CourseControllers.getSingleCourse);
router.get('/', CourseControllers.getAllCourses);

router.patch(
  '/:id',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.put('/:courseId/assign-faculties', validateRequest(CourseValidations.facultiesWithCourseValidationSchema), CourseControllers.assignFacultiesWithCourse);
router.put('/:courseId/remove-faculties', validateRequest(CourseValidations.facultiesWithCourseValidationSchema), CourseControllers.removeFacultiesFromCourse);

router.delete('/:id', CourseControllers.deleteCourse);


export const CourseRoutes = router;
