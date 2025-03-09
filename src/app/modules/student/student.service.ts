import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import { User } from '../user/uesr.model';

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
}
};

export const StudentServices = {

  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
};
