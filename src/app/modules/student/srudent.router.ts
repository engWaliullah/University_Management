import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidations } from './student.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  StudentController.getAllStudentController,
);
router.get(
  '/:studentId',
  auth('admin', 'faculty', 'student'),
  StudentController.getSingleStudentController,
);

router.patch(
  '/:studentId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(StudentValidations.UpdateStudentValidationSchema),
  StudentController.updateSingleStudentController,
);

router.delete(
  '/:studentId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  StudentController.deleteSingleStudentController,
);

export const StudentRoutes = router;
