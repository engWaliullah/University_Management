import { Model, Types } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGurdian = {
  name: string;
  occupation: string;
  address: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  // password: string;
  name: TUserName;
  gender: 'Male' | 'Female';
  dateOfBirth?: string;
  email: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-';
  contactNo: string;
  emergencyContactNo: string;
  currentAddress: string;
  permanentAddress: string;
  gurdian: TGurdian;
  localGurdian: TLocalGurdian;
  profileImg?: string;
  admissionSemester: Types.ObjectId;
  admissionDepartment: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  isDeleted: boolean;
};

// for creating static method
export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}
