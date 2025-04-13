import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { userValidation } from './user.validation';
import { UserControllers } from './user.controller';
import { upload } from '../../utils/sendImageToCloudinary';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidations } from '../student/student.validation';
import { createAdminValidationSchema } from '../adminnn/admin.validation';
import {
  createFacultyValidationSchema,
  studentValidations,
} from '../faculty/faculty.validation';

const router = express.Router();

router.post(
  '/create-student',
  // auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(studentValidations.createFacultyValidationSchema),
  UserControllers.createStudent,
);


router.post(
  '/create-faculty',
  // auth(USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  // auth(USER_ROLE.admin),
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);

router.get('/me', auth('admin', 'faculty', 'student'), UserControllers.getMe);

router.post(
  '/change-status/:id',
  auth('admin'),
  validateRequest(userValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
);

export const UserRoute = router;
