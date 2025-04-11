import httpStatus from 'http-status';
import AppError from "../../errors/AppError";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./OfferedCourse.interface";
import { OfferedCourse } from "./OfferedCourse.model";
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
    // check if the semester registration id is exists
    const { semesterRegistration, academicFaculty, academicDepartment, course, faculty } = payload;

    const isSemesterRegistrationExits = await SemesterRegistration.findById(semesterRegistration);
    if (!isSemesterRegistrationExits) {
        throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found');
    }
    
    const academicSemester = isSemesterRegistrationExits.academicSemester

    const isAcademicFacultyExits = await AcademicFaculty.findById(academicFaculty);
    if (!isAcademicFacultyExits) {
        throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not found');
    }

    const isAcademicDepartmentExits = await AcademicDepartment.findById(academicDepartment);
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



    const result = await OfferedCourse.create({...payload, academicSemester});
    return result;
}


export const OfferedCourseService = {
    createOfferedCourseIntoDB,
    // getOfferedCourseFromDB,
}