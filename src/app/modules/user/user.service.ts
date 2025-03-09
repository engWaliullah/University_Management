import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { User } from './uesr.model';
import { TUser } from './user.interface';
import { generatedStudentId } from './user.utils';
import AppError from '../../errors/AppError';

const createUserIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //set default password if not provided
  userData.password = password || (config.default_password as string);

  // set role
  userData.role = 'student';

  // find acedemic semester information
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );


  const session = await mongoose.startSession()


  try {
    session.startTransaction()
     // set manually genarated id
  // userData.id = '2030100001'
  userData.id = await generatedStudentId(admissionSemester);

  // create a user (transection - 1)
  const newUser = await User.create([userData], {session}); // array for using session // buildin static methods

  // create a student
  if (!newUser.length) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
  }


    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // reference _id

    // create a student (transection - 2)
    const newStudent = await Student.create([payload], {session});

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
    }

    // commit the transaction
    await session.commitTransaction();
    await session.endSession()

    return newStudent;

  } catch (error) {

    await session.abortTransaction();
    await session.endSession()

    throw new Error('Failed to create student');
    
  }
 


};

export const UserServices = {
  createUserIntoDB,
};
