import httpStatus from 'http-status';
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {
    const academicSemester = payload?.academicSemester;

    // check if the semester is exists
    const academicSemesterExists = await AcademicSemester.findById(academicSemester);
    if (!academicSemesterExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Academic semester not found');
    }

    // check if the semester registration already exists
    const isSemesterRegistrationExists = await SemesterRegistration.findOne({academicSemester})
    if (isSemesterRegistrationExists) {
        throw new AppError(httpStatus.CONFLICT, 'Semester registration already exists');
    }

    const result = await SemesterRegistration.create(payload);
    return result;
};





const getSingleSemesterRegistrationFromDB = async () => {};
const getSemesterRegistrationFromDB = async () => {};
const updateSemesterRegistrationIntoDB = async () => {};


export const SemesterRegistrationService = {
    createSemesterRegistrationIntoDB,
    getSingleSemesterRegistrationFromDB,
    getSemesterRegistrationFromDB,
    updateSemesterRegistrationIntoDB
}