import { model, Schema } from 'mongoose';
import {
  StudentModel,
  TGurdian,
  TLocalGurdian,
  TStudent,
  TUserName,
} from './student.interface';

const NameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'First name cannot be more than 20 characters'],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'last Name is required'],
  },
});

const GurdianSchema = new Schema<TGurdian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const LocalGurdianSchema = new Schema<TLocalGurdian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  address: { type: String, required: true },
});

const StudentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id must be required'],
      unique: true,
      ref: 'User',
    },

    name: {
      type: NameSchema,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Female', 'Male'],
      required: true,
    },
    dateOfBirth: { type: Date },
    email: { type: String, required: true, unique: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
    },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    currentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    gurdian: {
      type: GurdianSchema,
      required: true,
    },
    localGurdian: {
      type: LocalGurdianSchema,
      required: true,
    },
    profileImage: { type: String },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    admissionDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//virtual
StudentSchema.virtual('fullName').get(function () {
  return this.name.firstName + ' ' + this.name.lastName;
});

// query middleware
StudentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
StudentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// [ { $match: { isDeleted: { $ne: true } } }  ,{ '$match': { id: '1234567' } } ]

StudentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating a custom static  method

StudentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });

  return existingUser;
};

// crearte a custom instance methods
StudentSchema.methods.isUserExits = async function (id: string) {
  const existingUser = await Student.findOne({ id });

  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', StudentSchema);
