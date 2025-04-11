import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QuireBuilder from '../../builder/QueryBuilder';
import { registrationStatus } from './semesterRegistration.constant';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  // check if there any registered semester that is already 'UPCIOMING' | 'ONGOING'
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [{ status: registrationStatus.UPCOMING }, { status: registrationStatus.ONGOING }],
    });
  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.CONFLICT,
      `There is a already ${isThereAnyUpcomingOrOngoingSemester.status} registered semester`,
    );
  }

  // check if the semester is exists
  const academicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  if (!academicSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic semester not found');
  }

  // check if the semester registration already exists
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Semester registration already exists',
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QuireBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate('academicSemester');
  return result;
};
const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {

    // check if the request semester registration is exists
    const isSemesterRegistrationExists = await SemesterRegistration.findById(id);
    if (!isSemesterRegistrationExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found');
    }

    // if the request semester registration is ended, we will not allow to update
    const currentSemesterStatues = isSemesterRegistrationExists?.status;
    const requestStatus = payload?.status;

    if(currentSemesterStatues === registrationStatus.ENDED){
        throw new AppError(httpStatus.BAD_REQUEST, `This semester registration is already"${currentSemesterStatues}", you can't update it`);
    }

    // "UPCOMING" --> "ONGOING" --> "ENDED"
    if (currentSemesterStatues === registrationStatus.UPCOMING &&  requestStatus === registrationStatus.ENDED) {
        throw new AppError(httpStatus.BAD_REQUEST, `You can't directly update from "${currentSemesterStatues}" to "${requestStatus}"`);
    }
    if (currentSemesterStatues === registrationStatus.ONGOING &&  requestStatus === registrationStatus.UPCOMING) {
        throw new AppError(httpStatus.BAD_REQUEST, `You can't directly update from "${currentSemesterStatues}" to "${requestStatus}"`);
    }

    const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {new: true})
    return result;

};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getSingleSemesterRegistrationFromDB,
  getAllSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
