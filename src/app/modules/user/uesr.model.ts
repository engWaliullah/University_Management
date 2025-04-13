import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import config from '../../config';
import { UserStatus } from './user.constant';

const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangeAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['admin', 'faculty', 'student'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: UserStatus,
      default: 'in-progress',
    },
  },
  {
    timestamps: true,
  },
);

// pre save middleware/ hooks
userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: we will save the data');

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcript_salt_rounds),
  );
  next();
});

// post save middleware/ hooks:: send empty password
userSchema.post('save', function (doc, next) {
  doc.password = ' ';
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashPassword: string,
) {
  return await bcrypt.compare(plainPassword, hashPassword);
};

userSchema.statics.isJWTIssuedBeforeChangePassword = function(passwordChangedTimestamp : Date, jwtTimestamp: number) {
  const passwordChangedTime = new Date(passwordChangedTimestamp).getTime() / 1000;

  return passwordChangedTime > jwtTimestamp;
  
}

export const User = model<TUser, UserModel>('User', userSchema);
