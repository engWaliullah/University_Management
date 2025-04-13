import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidations } from './student.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('', StudentController.getAllStudentController);
router.patch(
  '/:studentId',
  validateRequest(StudentValidations.UpdateStudentValidationSchema),
  StudentController.updateSingleStudentController,
);
router.get('/:studentId', auth("admin", "faculty", "student"), StudentController.getSingleStudentController);
router.delete('/:studentId', StudentController.deleteSingleStudentController);

export const StudentRoutes = router;
