import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { Student } from './student.model';
import { User } from '../user/uesr.model';
import AppError from '../../errors/AppError';
import { TStudent } from './student.interface';
import QuireBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './student.constant';


const getAllStudentsFromDB = async (query : Record<string, unknown>) => {


  /*

  const queryObj = { ...query };

  const excludedFields = ['searchTerm','sort', 'limit', 'page', 'fields'];
  excludedFields.forEach((el) => delete queryObj[el]);

  console.log({queryObj}, {query});

  let searchTerm = ''
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string
  }
const searchQuery = Student.find({
  $or: studentSearchableFields.map((field) => ({
     [field]: { $regex: searchTerm, $options: 'i' },
  }))
 })


const filterQuiery = searchQuery.find(queryObj)
  .populate('admissionSemester')
  .populate({
    path: 'admissionDepartment',
    populate: {
    path: 'academicFaculty',
    }
  });


  let sort = '-createdAt';
  if (query?.sort) {
    sort = query?.sort as string;
  }

  const sortQuery = filterQuiery.sort(sort)
  
  let limit = 1;
  let page = 1
  let skip = 0;

  if (query?.limit) {
    limit = Number(query?.limit)
  }

  if (query?.page) {
    page = Number(query?.page)
    skip = (page - 1) * limit
  }

  const paginateQuery = sortQuery.skip(skip);

  let fields = '-__v'
if (query.fields) {
  fields = (query.fields as string).split(',').join(' ');

}

const fieldQuery = paginateQuery.select(fields);
const limitQuery = await fieldQuery.limit(limit);

return limitQuery;

*/


const studentQuery = new QuireBuilder(Student.find()
.populate('user')
.populate('admissionSemester')
.populate({
  path: 'admissionDepartment',
  populate: {
  path: 'academicFaculty',
  }
}), 
query)
.search(studentSearchableFields)
.filter().sort().paginate().fields();

const result = await studentQuery.modelQuery;
return result;

};


const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  // const result = await Student.aggregate([{ $match: { id } }]);
  const result = await Student.findById( id )
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

  const result = await Student.findByIdAndUpdate( id , modifiedUpdatedData, {new: true, runValidators: true})
  return result;
};


const deleteSingleStudentFromDB = async (id: string) => {

const session = await mongoose.startSession();


try {
  
  session.startTransaction()

  const deletedStudent = await Student.findByIdAndUpdate( id , { isDeleted: true }, {new: true, session});

  if (!deletedStudent) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
  }

  const userId = deletedStudent.user

  // deleted user 
  const deletedUser = await User.findByIdAndUpdate(userId, {isDeleted: true}, {new: true, session});
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
