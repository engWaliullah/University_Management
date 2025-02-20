import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { User } from './uesr.model';
import { TUser } from './user.interface';

const createUserIntoDB = async (password: string, studentData: TStudent) => {

  // create a user object
  const userData : Partial<TUser> = {}

  //set default password if not provided
  userData.password = password || config.default_password as string


  // set role 
  userData.role = 'student'

// set manually genarated id
userData.id = '2030100001'

// create a user 
  const newUser = await User.create(userData); // buildin static methods

  // create a student 
  if(Object.keys(newUser).length){
    studentData.id = newUser.id;
    studentData.user = newUser._id; // reference _id 

    const newStudent = await Student.create(studentData)
    return newStudent;

  }

};



export const UserServices = {
    createUserIntoDB,

};
