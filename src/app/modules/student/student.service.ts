import { Student } from './student.model';

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
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {

  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
};
