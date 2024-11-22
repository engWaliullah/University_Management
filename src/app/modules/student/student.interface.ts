export type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type Gurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type LocalGurdian = {
  name: string;
  occupation: string;
  address: string;
};

export type Student = {
  id: string;
  name: UserName;
  gender: 'Male' | 'Female';
  dateOfBirth?: string;
  email: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-';
  contactNo: string;
  emergencyContactNo: string;
  currentAddress: string;
  permanentAddress: string;
  gurdian: Gurdian;
  localGurdian: LocalGurdian;
  profileImage?: string;
  active: 'active' | 'blocked';
};
