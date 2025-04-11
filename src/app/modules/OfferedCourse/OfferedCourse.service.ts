import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './OfferedCourse.interface';
import { OfferedCourse } from './OfferedCourse.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { hasTimeConflict } from './OfferedCourse.utils';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  // check if the semester registration id is exists
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;

  const isSemesterRegistrationExits =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found');
  }

  const academicSemester = isSemesterRegistrationExits.academicSemester;

  const isAcademicFacultyExits =
    await AcademicFaculty.findById(academicFaculty);
  if (!isAcademicFacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not found');
  }

  const isAcademicDepartmentExits =
    await AcademicDepartment.findById(academicDepartment);
  if (!isAcademicDepartmentExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found');
  }

  const isCourseExits = await Course.findById(course);
  if (!isCourseExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }

  const isFacultyExits = await Faculty.findById(faculty);
  if (!isFacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  // check if the department is belongs to the faculty
  const isDepartmentbelongsToFaculty = await AcademicDepartment.findOne({
    academicFaculty,
    _id: academicDepartment,
  });
  if (!isDepartmentbelongsToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${
        isAcademicDepartmentExits.name
      } is not belongs to ${isAcademicFacultyExits.name} faculty`,
    );
  }

  // check if the same offered course same section in same registered semester exists
  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });
  if (!isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.CONFLICT,
      `Offered Course with same secion already exists`,
    );
  }

  // get the schedule of the faculties
  const assignSchedules = await OfferedCourse.findOne({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

if (hasTimeConflict(assignSchedules, newSchedule)) {
  throw new AppError(
    httpStatus.CONFLICT,
    `This faculty is not avaiable at that time ! Please choose onther schedule`,
  );
}

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

export const OfferedCourseService = {
  createOfferedCourseIntoDB,
  // getOfferedCourseFromDB,
};
