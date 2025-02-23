import { Router } from 'express';
import { UserRoute } from '../modules/user/user.route';
import { StudentRoutes } from '../modules/student/srudent.router';
import { AcademicSemesterRoutes } from './../modules/academicSemester/academicSemester.router';

const router = Router();

const moduleRoutes = [
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
