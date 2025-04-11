import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { semesterRegistrationValidation } from './semesterRegistration.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();

router.post(
  '/:create-semester-registration',
  validateRequest(
    semesterRegistrationValidation.createSemesterRegistrationVadationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);

router.get('', SemesterRegistrationController.getAllSemesterRegistration);

router.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration,
);

router.patch(
  '/:id',
  validateRequest(
    semesterRegistrationValidation.updateSemesterRegistrationVadationSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);

export const semesterRegistrationRoute = router;
