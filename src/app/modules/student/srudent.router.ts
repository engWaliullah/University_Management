import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();


router.get('', StudentController.getAllStudentController);
router.get('/:studentId', StudentController.getSingleStudentController);
router.delete('/:studentId', StudentController.deleteSingleStudentController);

export const StudentRoutes = router;
