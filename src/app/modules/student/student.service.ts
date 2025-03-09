import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import { User } from '../user/uesr.model';
import { TStudent } from './student.interface';
import { object } from 'joi';

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
  .populate('admissionSemester')
  .populate({
    path: 'admissionDepartment',
    populate: {
    path: 'academicFaculty',
    }
  });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  // const result = await Student.aggregate([{ $match: { id } }]);
  const result = await Student.findOne({ id })
  .populate('admissionSemester')
  .populate({
    path: 'admissionDepartment',
    populate: {
    path: 'academicFaculty',
    }
  });
  return result;
};


const updateSingleStudentFromDB = async (id: string, payload: Partial<TStudent>) => {

  const {name, gurdian, localGurdian, ...remainingStudentData} = payload;

  const modifiedUpdatedData : Record<string, unknown> = {...remainingStudentData };

  if (name && Object.keys(name).length ) {
    for(const [key, value] of Object.entries(name))
      modifiedUpdatedData[`name.${key}`] = value
  }


  if (gurdian && Object.keys(gurdian).length) {
    for(const [key, value] of Object.entries(gurdian))
      modifiedUpdatedData[`gurdian.${key}`] = value
  }
      
  if (localGurdian && Object.keys(localGurdian).length) {
    for(const [key, value] of Object.entries(localGurdian))
      modifiedUpdatedData[`localGurdian.${key}`] = value
  }

  const result = await Student.findOneAndUpdate({id}, modifiedUpdatedData, {new: true, runValidators: true})
  return result;
  };


const deleteSingleStudentFromDB = async (id: string) => {

const session = await mongoose.startSession();


try {
  
  session.startTransaction()

  const deletedStudent = await Student.findOneAndUpdate({ id }, { isDeleted: true }, {new: true, session});

  if (!deletedStudent) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
  }

  // deleted user 
  const deletedUser = await User.findOneAndUpdate({id}, {isDeleted: true}, {new: true, session});
if (!deletedUser) {
  throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
}

await session.commitTransaction();
await session.endSession()

return deletedStudent;

} catch (error) {
  await session.abortTransaction();
  await session.endSession()
  throw new Error('Failed to delete student');
}
};

export const StudentServices = {

  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateSingleStudentFromDB,
  deleteSingleStudentFromDB,
};
