import { model, Schema } from 'mongoose';
import { Student } from './student/student.interface';

const StudentSchema = new Schema<Student>({
  id: { type: String },
  name: {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  gender: ['Female', 'Male'],
  dateOfBirth: { type: String },
  email: { text: String, required: true },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
  contactNo: { text: String, required: true },
  emergencyContactNo: { text: String, required: true },
  currentAddress: { text: String, required: true },
  permanentAddress: { text: String, required: true },
  gurdian: {
    fatherName: { text: String, required: true },
    fatherOccupation: { text: String, required: true },
    fatherContactNo: { text: String, required: true },
    motherName: { text: String, required: true },
    motherOccupation: { text: String, required: true },
    motherContactNo: { text: String, required: true },
  },
  localGurdian: {
    name: { text: String, required: true },
    occupation: { text: String, required: true },
    address: { text: String, required: true },
  },
  profileImage: { type: String },
  active: ['active', 'blocked'],
});

const Studetn = model<Student>('Student', StudentSchema);
