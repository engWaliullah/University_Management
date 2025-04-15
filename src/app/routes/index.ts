import { Router } from 'express';
import { UserRoute } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/Auth/Auth.route';
import { CourseRoutes } from '../modules/course/course.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { StudentRoutes } from '../modules/student/srudent.router';
import { offeredCourseRoutes } from '../modules/OfferedCourse/OfferedCourse.route';
import { EnrolledCourseRoutes } from '../modules/EnrolledCourse/enrolledCourse.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicSemesterRoutes } from './../modules/academicSemester/academicSemester.router';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { semesterRegistrationRoute } from '../modules/semesterRegistration/semesterRegistration.route';

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
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/semester-registrations',
    route: semesterRegistrationRoute,
  },
  {
    path: '/offered-courses',
    route: offeredCourseRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/enrolled-courses',
    route: EnrolledCourseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
