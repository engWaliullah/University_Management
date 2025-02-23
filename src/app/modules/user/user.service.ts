import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { User } from './uesr.model';
import { TUser } from './user.interface';
import { generatedStudentId } from './user.utils';

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

  // set manually genarated id
  // userData.id = '2030100001'
  userData.id = await generatedStudentId(admissionSemester);

  // create a user
  const newUser = await User.create(userData); // buildin static methods

  // create a student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id; // reference _id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createUserIntoDB,
};
