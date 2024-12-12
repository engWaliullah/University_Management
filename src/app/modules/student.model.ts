import bcript from 'bcrypt';
import { model, Schema } from 'mongoose';
import config from '../config';
import {
  StudentModel,
  TGurdian,
  TLocalGurdian,
  TStudent,
  TUserName,
} from './student/student.interface';

const NameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'First name cannot be more than 20 characters'],
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstNameStr === value;
    //   },
    //   message: '{VALUE} is not capitalize formate',
    // },
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
    password: { type: String, required: true },
    name: {
      type: NameSchema,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Female', 'Male'],
      required: true,
    },
    dateOfBirth: { type: String },
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
    active: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
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

// pre save middleware/ hooks
StudentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: we will save the data');

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcript.hash(
    user.password,
    Number(config.bcript_salt_rounds),
  );
  next();
});

// post save middleware/ hooks
StudentSchema.post('save', function (doc, next) {
  doc.password = ' ';
  next();
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
// StudentSchema.methods.isUserExits = async function (id: string) {
//   const existingUser = await Student.findOne({ id });

//   return existingUser;
// };

export const Student = model<TStudent, StudentModel>('Student', StudentSchema);
